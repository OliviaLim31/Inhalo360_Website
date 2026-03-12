import { motion } from 'motion/react';
import { Headset, Camera, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ARCamera } from '../components/ARCamera';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function Training() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white/20 to-gray-50/30">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl mb-6 text-gray-900">
              {t('training.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience immersive learning through our AR and VR training modules. Practice with real-time feedback and guidance.
            </p>
          </motion.div>

          {/* ── YouTube Tutorial Video ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
              <h2 className="text-3xl text-gray-900">
                MDI Inhaler Tutorial Video
              </h2>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/C9UOnS0n23o?si=HHA1N34D5Z-Kl_uY&rel=0&modestbranding=1"
                title="MDI Inhaler Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <p className="mt-4 text-gray-500 text-sm text-center">
              Watch the full inhaler tutorial before starting the AR guided session below.
            </p>
          </motion.div>

          {/* ── AR Camera Section ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center mb-6">
              <Camera className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl text-gray-900">
                {t('training.ar.title')}
              </h2>
            </div>
            
            <ARCamera />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-gray-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Headset className="w-12 h-12 text-blue-600 mr-4" />
                    <h2 className="text-3xl text-gray-900">
                      {t('training.vr.title')}
                    </h2>
                  </div>
                  
                  <img
                    src="https://images.unsplash.com/photo-1764314359427-6e685ce5b719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWx0aGNhcmV8ZW58MXx8fHwxNzcxOTE4MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="VR Training"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <h3 className="text-xl mb-4 text-gray-900">
                    {t('training.vr.subtitle')}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {t('training.vr.desc')}
                  </p>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => window.open('https://example.com/vr-training', '_blank')}
                  >
                    {t('training.vr.button')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
                    <h2 className="text-3xl text-gray-900">
                      {t('training.guide.title')}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-xl">
                        1
                      </div>
                      <div>
                        <p className="text-lg text-gray-900 mb-2">Have your MDI device ready</p>
                        <p className="text-gray-600 leading-relaxed">
                          Ensure you have a physical MDI inhaler available for the AR training session. Any standard MDI device will work.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-xl">
                        2
                      </div>
                      <div>
                        <p className="text-lg text-gray-900 mb-2">Grant camera access when prompted</p>
                        <p className="text-gray-600 leading-relaxed">
                          Your browser will ask for permission to access your camera. This is necessary for AR tracking and guidance.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-4 text-xl">
                        3
                      </div>
                      <div>
                        <p className="text-lg text-gray-900 mb-2">Follow the on-screen AR cues to practice</p>
                        <p className="text-gray-600 leading-relaxed">
                          Position your inhaler within the highlighted area and follow the step-by-step guidance provided by the system.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="text-blue-600">Note:</span> For the best experience, use this feature on a mobile device or tablet with a rear-facing camera in a well-lit environment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-12 text-center text-white"
          >
            <h2 className="text-4xl mb-6">
              Need Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered virtual pharmacist is available 24/7 to answer your questions about MDI usage, medication, and technique guidance in multiple languages.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => alert('Virtual Pharmacist chatbot would open here')}
            >
              Chat with Virtual Pharmacist
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
