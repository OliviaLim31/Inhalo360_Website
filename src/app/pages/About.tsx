import { motion } from 'motion/react';
import {
  AlertCircle, CheckCircle2, Users, Mail, Phone,
  GraduationCap, Briefcase, XCircle, Clock, Activity
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import AboutImage from '../../assets/images/woman-inhaler.webp';

const mentors = [
  {
    role: 'Industry Client',
    name: 'Dr. Ganesh Sritheran A/L Paneerselvam',
    phone: '+60 12-291 0960',
    email: 'ganeshsritheran.Paneerselvam@taylors.edu.my',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    role: 'Supervisor',
    name: 'Dr. Goh Wei Wei',
    phone: '+60 16-452 3585',
    email: 'weiwei.goh@taylors.edu.my',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500'
  }
];

const teamMembers = [
  { name: 'Ooi Wei Chuen', role: '3D Design Lead', phone: '+60 12-489 0755', email: '0372374@sd.taylors.edu.my' },
  { name: 'Sim Hong Bing', role: 'AI / ML Engineer', phone: '+60 18-985 5802', email: 'hongbing.sim@sd.taylors.edu.my' },
  { name: 'Lim Yun Xuan', role: 'AR / CV Engineer', phone: '+60 11-314 2776', email: 'yunxuan.lim03@sd.taylors.edu.my' },
  { name: 'Hassan Gohar', role: 'UI / UX Designer', phone: '+60 12-659 5542', email: 'gohar.hassan@sd.taylors.edu.my' },
  { name: 'Htet Aung Shine', role: '3D & System Architect', phone: '+60 17-283 6307', email: 'htetaung.shine@sd.taylors.edu.my' }
];

export function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white/20 to-gray-50/30 font-['Lora']">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl mb-6 text-gray-900 font-['Playfair_Display'] font-bold">
              {t('about.title') || 'The Problem & Our Team'}
            </h1>
          </motion.div>

          {/* ================= 问题与图片区 ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <h2 className="text-4xl text-gray-900 font-['Playfair_Display'] font-bold mb-8 flex items-center  color: 'from-purple-500 to-pink-500'">
                <AlertCircle className="w-10 h-10 text-red-500 mr-4" />
                The Core Challenges

              </h2>

              <Card className="border-red-100 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 group-hover:bg-red-500 transition-colors"></div>
                <CardContent className="p-6 pl-8 flex gap-5">
                  <div className="mt-1 bg-red-50 p-3 rounded-full h-fit text-red-500">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2"> Incorrect Use</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      <strong className="text-gray-800">70-90%</strong> of patients use inhalers incorrectly, making critical errors that reduce medication efficacy by <strong className="text-gray-800">up to 50%</strong>, with similar or higher rates observed in Southeast Asian countries.
                    </p>

                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-400 group-hover:bg-orange-500 transition-colors"></div>
                <CardContent className="p-6 pl-8 flex gap-5">
                  <div className="mt-1 bg-orange-50 p-3 rounded-full h-fit text-orange-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2"> Ineffective Training</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      Current education methods are inadequate. Patients forget <strong className="text-gray-800">40-80%</strong> of techniques within hours, and existing resources provide <strong className="text-gray-800">no real-time feedback</strong> during actual use.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400 group-hover:bg-blue-500 transition-colors"></div>
                <CardContent className="p-6 pl-8 flex gap-5">
                  <div className="mt-1 bg-blue-50 p-3 rounded-full h-fit text-blue-500">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2"> Lack of Resources</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      No accessible solution exists to provide <strong className="text-gray-800">continuous support</strong>, verify correct technique at home, or deliver individual learning needs, particularly in multilingual contexts.
                    </p>
                  </div>
                </CardContent>
              </Card>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex items-center justify-center relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <img
                src={AboutImage}
                alt="Patient using Inhaler"
                className="relative rounded-2xl shadow-xl w-full max-w-[450px] object-contain border-4 border-white/50 bg-white/50 backdrop-blur-sm"
              />
            </motion.div>
          </div>

          {/* ================= 解决方案区 ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

              <div className="flex items-center mb-8 relative z-10">
                <div className="bg-white/20 p-3 rounded-full mr-5 backdrop-blur-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-1">
                    {t('about.solution.title') || 'Our Solution'}
                  </h2>
                  <p className="text-xl text-blue-100 opacity-90">
                    {t('about.solution.subtitle') || 'The Next-Generation Learning Platform'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {['Bridging the Gap', 'Patient-Centric', 'Accessibility First'].map((title, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                    <h3 className="text-xl font-semibold mb-3 tracking-wide">{title}</h3>
                    <p className="text-blue-50 leading-relaxed text-sm">
                      {index === 0 && (t('about.solution.gap') || 'Combining the immersive benefits of AR/VR with the personalized feedback of AI.')}
                      {index === 1 && (t('about.solution.patient') || 'Solving the limitation of existing AR/VR systems which mainly target professionals.')}
                      {index === 2 && (t('about.solution.access') || 'Web-first architecture ensures cross-device accessibility on commonly available devices.')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= 团队介绍区 ================= */}

          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
              Division of Work
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Meet the dedicated professionals and Taylor's University students driving the Inhalo 360° project forward.
            </p>
          </div>

          {/* Section 1: Mentors & Advisors */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4 flex items-center">
              Mentors & Advisors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
                    <div className={`h-2 w-full bg-gradient-to-r ${mentor.color}`}></div>
                    <CardContent className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className={`p-4 rounded-full bg-gradient-to-br ${mentor.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <mentor.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">
                          {mentor.role}
                        </span>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">{mentor.name}</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <a href={`tel:${mentor.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center sm:justify-start hover:text-blue-600 transition-colors">
                            <Phone className="w-4 h-4 mr-2" /> {mentor.phone}
                          </a>
                          <a href={`mailto:${mentor.email}`} className="flex items-center justify-center sm:justify-start hover:text-blue-600 transition-colors break-all">
                            <Mail className="w-4 h-4 mr-2 flex-shrink-0" /> {mentor.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Project Team (Group 43) */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
              Project Team (Group 43)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-gray-100 bg-white hover:border-blue-200 hover:shadow-xl transition-all duration-300 group text-center h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">

                      {/* 头像区域 */}
                      <div className="relative mx-auto mb-5">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name.replace(/[^a-zA-Z\s]/g, ''))}&background=random&color=fff&size=128&bold=true`}
                          alt={member.name}
                          className="relative w-28 h-28 rounded-full border-4 border-white shadow-md group-hover:shadow-lg transition-all duration-300"
                        />
                      </div>

                      {/* 🔥 UI/UX 升级：人名加入了 Hover 变色 */}
                      <h4 className="text-[1.15rem] font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {member.name}
                      </h4>

                      {/* 🔥 UI/UX 升级：职位字体变大 (text-sm)，常驻渐变色匹配参考图 */}
                      <div className="mb-5">
                        <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold tracking-wide rounded-full shadow-md">
                          {member.role}
                        </span>
                      </div>

                      {/* 底部联系方式，推到底部对齐 */}
                      <div className="flex justify-center space-x-3 mt-auto pt-4 border-t border-gray-100/80">
                        <a href={`mailto:${member.email}`} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200" title={`Email ${member.name}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                        <a href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} className="p-2.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200" title={`Call ${member.name}`}>
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}