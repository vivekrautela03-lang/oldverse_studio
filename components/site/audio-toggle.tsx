"use client";

import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type AudioRig = {
  context: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  intervalId: number;
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

function getAudioContextClass() {
  return window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
}

export function AudioToggle() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const rigRef = useRef<AudioRig | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("oldverse-ambient-enabled");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      const rig = rigRef.current;
      if (!rig) {
        return;
      }

      window.clearInterval(rig.intervalId);
      rig.oscillators.forEach((oscillator) => oscillator.stop());
      rig.lfo.stop();
      void rig.context.close();
    };
  }, []);

  const buildAmbientRig = useCallback(async () => {
    if (rigRef.current) {
      return rigRef.current;
    }

    const AudioContextClass = getAudioContextClass();

    if (!AudioContextClass) {
      return null;
    }

    const context = new AudioContextClass();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 780;
    filter.Q.value = 1.8;

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.045;
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const oscillatorSettings = [
      { frequency: 55, type: "triangle" as const, gain: 0.05 },
      { frequency: 82.41, type: "sine" as const, gain: 0.035 },
      { frequency: 110, type: "sawtooth" as const, gain: 0.015 }
    ];

    const oscillators = oscillatorSettings.map((settings) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = settings.type;
      oscillator.frequency.value = settings.frequency;
      gain.gain.value = settings.gain;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      return oscillator;
    });

    filter.connect(master);
    master.connect(context.destination);
    master.gain.value = 0;
    lfo.start();

    const intervalId = window.setInterval(() => {
      const now = context.currentTime;
      oscillators.forEach((oscillator, index) => {
        const offset = (Math.random() - 0.5) * (index === 2 ? 9 : 4);
        oscillator.detune.cancelScheduledValues(now);
        oscillator.detune.linearRampToValueAtTime(offset, now + 6);
      });
    }, 7000);

    const rig: AudioRig = {
      context,
      master,
      filter,
      oscillators,
      intervalId,
      lfo,
      lfoGain
    };

    rigRef.current = rig;
    return rig;
  }, []);

  const startAmbient = useCallback(async () => {
    const rig = await buildAmbientRig();
    if (!rig) {
      return;
    }

    if (rig.context.state === "suspended") {
      await rig.context.resume();
    }

    const now = rig.context.currentTime;
    rig.master.gain.cancelScheduledValues(now);
    rig.master.gain.linearRampToValueAtTime(0.08, now + 1);
  }, [buildAmbientRig]);

  useEffect(() => {
    window.localStorage.setItem("oldverse-ambient-enabled", String(enabled));

    if (!enabled) {
      const rig = rigRef.current;
      if (!rig) {
        return;
      }

      const now = rig.context.currentTime;
      rig.master.gain.cancelScheduledValues(now);
      rig.master.gain.linearRampToValueAtTime(0, now + 0.8);
      return;
    }

    void startAmbient();
  }, [enabled, startAmbient]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <motion.button
      type="button"
      onClick={() => startTransition(() => setEnabled((state) => !state))}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={enabled}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-3 rounded-full border border-white/12 bg-[rgba(15,11,10,0.7)] px-4 py-3 text-sm text-cream shadow-panel backdrop-blur-xl"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${enabled ? "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" : "bg-cream/35"}`}
      />
      <span className="uppercase tracking-[0.22em]">{enabled ? "Ambient On" : "Ambient Off"}</span>
    </motion.button>
  );
}
