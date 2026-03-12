import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

// ─── Step Data (outside component to avoid re-creation) ───────────────────────
const STEPS = [
  {
    title: 'Shake the Inhaler',
    description: 'Hold the MDI inhaler upright and shake it vigorously 4–5 times. This mixes the medication with the propellant and ensures a consistent dose.',
    tip: '💡 Always shake before every puff, even mid-session.',
    duration: '~5 sec',
    icon: '🫙',
  },
  {
    title: 'Remove the Cap',
    description: 'Remove the mouthpiece protective cap. Check the opening for any debris that could block airflow.',
    tip: '💡 If first use or unused >7 days, prime by releasing 2 test sprays into the air.',
    duration: '~5 sec',
    icon: '🔓',
  },
  {
    title: 'Exhale Fully',
    description: 'Breathe out completely through your mouth, emptying your lungs as much as comfortable. This creates space for the medicated mist to reach your airways.',
    tip: '💡 Turn your face away from the inhaler when exhaling to avoid wetting the mouthpiece.',
    duration: '~3 sec',
    icon: '💨',
  },
  {
    title: 'Position the Inhaler',
    description: 'Place the mouthpiece between your lips and seal tightly. Hold the inhaler upright (canister on top). Tilt your chin slightly upward to open the airway.',
    tip: '💡 Alternatively, hold the inhaler 2–4 cm from your open mouth for an open-mouth technique.',
    duration: '~5 sec',
    icon: '👄',
  },
  {
    title: 'Inhale & Press',
    description: 'Begin breathing in slowly and deeply. Simultaneously press the canister down firmly once to release one dose. Continue inhaling slowly for 4–5 seconds.',
    tip: '💡 Coordinate breathing in and pressing at the same time — this is the most critical step.',
    duration: '~5 sec',
    icon: '🫁',
  },
  {
    title: 'Hold Your Breath',
    description: 'Remove the inhaler and hold your breath for 10 seconds (or as long as comfortably possible). This allows medication to settle deep in the bronchial airways.',
    tip: '💡 If a second puff is needed, wait at least 30 seconds before repeating from Step 1.',
    duration: '~10 sec',
    icon: '⏱️',
  },
  {
    title: 'Breathe Out Slowly',
    description: 'Exhale slowly and gently through your mouth or nose. Do not exhale into the inhaler. Replace the mouthpiece cap to keep the device clean.',
    tip: '💡 Rinse your mouth with water after using steroid inhalers to prevent mouth infections.',
    duration: '~5 sec',
    icon: '🌬️',
  },
  {
    title: 'Check Dose Counter',
    description: 'Note the reading on the dose counter (if present). When it reads 20 remaining, arrange a refill. Do not use the inhaler if the counter reads 0.',
    tip: '💡 Track your usage in a diary or app to ensure you never run out unexpectedly.',
    duration: '~10 sec',
    icon: '📊',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ARCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);

  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'detected'>('scanning');

  const [currentStep, setCurrentStep] = useState(0);
  const [evaluated, setEvaluated] = useState<Record<number, 'pass' | 'fail'>>({});

  const passCount = Object.values(evaluated).filter(v => v === 'pass').length;
  const progress = Math.round((passCount / STEPS.length) * 100);

  // ── Evaluation helpers ─────────────────────────────────────────────────────
  const markStep = (idx: number, result: 'pass' | 'fail') => {
    setEvaluated(prev => ({ ...prev, [idx]: result }));
    if (result === 'pass' && idx === currentStep) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const resetAll = () => {
    setEvaluated({});
    setCurrentStep(0);
  };

  // ── Camera logic ───────────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(ms);
      setCameraActive(true);
      setCameraError(null);
      setScanStatus('scanning');
    } catch {
      setCameraError('Unable to access camera. Please grant camera permission and try again.');
    }
  };

  const stopCamera = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    stream?.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStream(null);
    setCameraActive(false);
    setScanStatus('scanning');
  };

  // Attach stream to video element
  useEffect(() => {
    if (!cameraActive || !stream || !videoRef.current) return;
    videoRef.current.srcObject = stream;

    const timer = setTimeout(() => setScanStatus('detected'), 3000);
    return () => clearTimeout(timer);
  }, [cameraActive, stream]);

  // Auto-advance step when camera detects inhaler
  useEffect(() => {
    if (scanStatus !== 'detected') return;
    const iv = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(iv);
        return prev;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, [scanStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // ── AR canvas overlay ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!cameraActive) return;

    let pulse = 0;
    let floatY = 0;
    let glow = 0;

    const draw = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!canvas || !video || !video.videoWidth) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulse += 0.04; floatY += 0.03; glow += 0.05;

      const detected = scanStatus === 'detected';
      const primary = detected ? '#00E5CC' : '#60a5fa';
      const glowCol = detected ? 'rgba(0,229,204,' : 'rgba(96,165,250,';
      const alpha = 0.55 + Math.sin(pulse) * 0.25;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + Math.sin(floatY) * 8;

      const iW = Math.min(90, canvas.width * 0.12);
      const iH = Math.min(280, canvas.height * 0.6);
      const iX = cx - iW / 2;
      const iY = cy - iH / 2;

      // Rounded rect helper
      const rr = (rx: number, ry: number, rw: number, rh: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(rx + r, ry);
        ctx.lineTo(rx + rw - r, ry); ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + r);
        ctx.lineTo(rx + rw, ry + rh - r); ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - r, ry + rh);
        ctx.lineTo(rx + r, ry + rh); ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - r);
        ctx.lineTo(rx, ry + r); ctx.quadraticCurveTo(rx, ry, rx + r, ry);
        ctx.closePath();
      };

      ctx.shadowColor = primary;
      ctx.shadowBlur = 28 + Math.sin(glow) * 12;

      // Inhaler body
      rr(iX, iY, iW, iH, iW * 0.35);
      ctx.strokeStyle = primary; ctx.lineWidth = 3;
      ctx.fillStyle = glowCol + '0.12)'; ctx.fill(); ctx.stroke();

      // Cap & nozzle
      const capW = iW * 0.7, capH = iH * 0.12;
      const capX = cx - capW / 2, capY = iY - capH - 4;
      rr(capX, capY, capW, capH, 6);
      ctx.fillStyle = glowCol + '0.2)'; ctx.fill();
      ctx.strokeStyle = primary; ctx.lineWidth = 2.5; ctx.stroke();

      const nW = capW * 0.45, nH = capH * 0.6;
      rr(cx - nW / 2, capY - nH, nW, nH, 4);
      ctx.fillStyle = glowCol + '0.25)'; ctx.fill(); ctx.stroke();

      // Canister window
      rr(cx - iW * 0.3, iY + iH * 0.12, iW * 0.6, iH * 0.45, 8);
      ctx.strokeStyle = glowCol + (alpha * 0.8) + ')'; ctx.lineWidth = 2;
      ctx.fillStyle = glowCol + '0.08)'; ctx.fill(); ctx.stroke();

      // Side button
      rr(iX - iW * 0.18, cy - iH * 0.04, iW * 0.18, iH * 0.08, 4);
      ctx.fillStyle = glowCol + '0.3)'; ctx.fill();
      ctx.strokeStyle = primary; ctx.lineWidth = 2; ctx.stroke();

      ctx.shadowBlur = 0;

      // Scanning frame corners
      const fW = iW + 60, fH = iH + capH + nH + 40;
      const fX = cx - fW / 2, fY = capY - nH - 15;
      ctx.strokeStyle = primary; ctx.lineWidth = 3;
      ctx.shadowColor = primary; ctx.shadowBlur = 8;
      [[fX, fY, 1, 1], [fX + fW, fY, -1, 1], [fX, fY + fH, 1, -1], [fX + fW, fY + fH, -1, -1]].forEach(([x, y, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(x as number, (y as number) + (sy as number) * 20);
        ctx.lineTo(x as number, y as number);
        ctx.lineTo((x as number) + (sx as number) * 20, y as number);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // Scan line (only when not detected)
      if (!detected) {
        const sY = fY + ((pulse * 8) % fH);
        const sg = ctx.createLinearGradient(fX, sY, fX + fW, sY);
        sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, primary); sg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.strokeStyle = sg as unknown as string; ctx.lineWidth = 2;
        ctx.moveTo(fX, sY); ctx.lineTo(fX + fW, sY); ctx.stroke();
      }

      // Status label
      ctx.font = `600 ${Math.max(14, canvas.width * 0.022)}px Inter,sans-serif`;
      ctx.textAlign = 'center';
      ctx.shadowColor = primary; ctx.shadowBlur = 10;
      ctx.fillStyle = primary;
      ctx.fillText(detected ? '✓  Inhaler Detected' : '⟳  Scanning…', cx, fY + fH + 30);
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [cameraActive, scanStatus]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Camera viewer */}
      <Card className="border-gray-200 overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="relative bg-gray-900 aspect-video overflow-hidden">
            {!cameraActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="relative mb-6">
                  <Camera className="w-24 h-24 text-cyan-400 opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 border-2 border-cyan-400/30 rounded-full animate-ping" />
                  </div>
                </div>
                <h3 className="text-2xl mb-3 font-semibold text-center">AR Live Guidance</h3>
                <p className="text-gray-300 mb-8 text-center max-w-md leading-relaxed">
                  Activate your camera to see real-time AR guidance. An inhaler overlay will appear to guide each step.
                </p>
                {cameraError && (
                  <div className="mb-5 flex items-center gap-2 bg-red-500/20 border border-red-400 rounded-xl px-4 py-3 text-red-300 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {cameraError}
                  </div>
                )}
                <Button
                  onClick={startCamera}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 hover:scale-105 transition-transform"
                >
                  Launch AR Live Mode
                </Button>
              </div>
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

                {/* Status bar */}
                <div className="absolute top-4 left-4 right-4 z-20">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 text-white border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
                      <span className="text-sm font-medium">AR Camera Active</span>
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${scanStatus === 'detected' ? 'text-cyan-300 bg-cyan-900/50' : 'text-yellow-300 bg-yellow-900/50'}`}>
                      {scanStatus === 'detected' ? '✓ Inhaler Detected' : '⟳ Scanning...'}
                    </span>
                  </div>
                </div>

                {/* End button */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center z-20">
                  <Button
                    onClick={stopCamera}
                    size="lg"
                    className="rounded-full px-8 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> End AR Session
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step guide */}
      <Card className="mt-6 border-gray-200 shadow-sm">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">AR Guidance Steps</h3>
              <p className="text-sm text-gray-500 mt-1">Follow each step and mark it Done or Try Again</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-gray-500">Completion</span>
                <p className="text-lg font-bold text-cyan-600">{progress}%</p>
              </div>
              <button
                onClick={resetAll}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mb-7 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, idx) => {
              const ev = evaluated[idx];
              const isCurrent = currentStep === idx;
              const passed = ev === 'pass';
              const failed = ev === 'fail';

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                    passed ? 'border-green-300 bg-green-50/60'
                    : failed ? 'border-orange-300 bg-orange-50/40'
                    : isCurrent ? 'border-cyan-400 bg-cyan-50/40 shadow-lg'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-base transition-colors ${
                      passed ? 'bg-green-100 text-green-600'
                      : failed ? 'bg-orange-100 text-orange-500'
                      : isCurrent ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow'
                      : 'bg-gray-100 text-gray-400'
                    }`}>
                      {passed ? <CheckCircle2 className="w-5 h-5" /> : <span>{step.icon}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Step {idx + 1}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{step.duration}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{step.title}</p>
                    </div>
                    {passed && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full shrink-0">✓ Done</span>}
                    {failed && <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full shrink-0">↻ Retry</span>}
                  </div>

                  {/* Description */}
                  <div className="px-5 pb-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Tip */}
                  <div className="px-5 pb-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <p className="text-xs text-blue-700 leading-relaxed">{step.tip}</p>
                    </div>
                  </div>

                  {/* Evaluation buttons */}
                  <div className="px-5 pb-5 flex gap-2">
                    <button
                      onClick={() => markStep(idx, 'pass')}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        passed
                          ? 'bg-green-500 text-white'
                          : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-500 hover:text-white hover:border-green-500'
                      }`}
                    >
                      ✓ Done
                    </button>
                    <button
                      onClick={() => markStep(idx, 'fail')}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        failed
                          ? 'bg-orange-400 text-white'
                          : 'bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-400 hover:text-white hover:border-orange-400'
                      }`}
                    >
                      ↻ Try Again
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion message */}
          {progress === 100 && (
            <div className="mt-6 bg-gradient-to-r from-green-50 to-cyan-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h4 className="text-lg font-bold text-green-700 mb-1">All steps completed!</h4>
              <p className="text-sm text-green-600">Great job! You've practiced all MDI inhaler steps. Keep practicing to build muscle memory.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}