import { Link } from 'react-router-dom';
import logoParchment from '../assets/logo-parchment.png';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="navy-gradient py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center">
          <img src={logoParchment} alt="SJ Law" className="w-28 h-28 object-contain mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl font-serif font-bold text-white mb-4">About SJ Law</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Nigeria's most structured and comprehensive digital law school  --  built for serious law students who deserve better resources.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-[var(--muted)]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">Our Mission</div>
              <h2 className="text-4xl font-serif font-bold text-[var(--primary)] mb-6">
                Democratising legal education in Nigeria
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                SJ Law was built on a simple conviction: Nigerian law students deserve access to high-quality, structured, and comprehensive learning resources that match the depth of their academic programmes.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                We have built a complete digital learning environment  --  from foundational 100 Level principles to advanced 500 Level practice  --  covering every year of law school with professional-quality notes, engaging video content, searchable case law, and rigorous practice questions.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Our subscription model ensures that students pay only for the academic level they are studying, making premium legal education accessible at every stage of the journey.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-8 space-y-6">
              {[
                ['2,400+', 'Active Students', 'Law students across Nigeria'],
                ['51+', 'Law Courses', 'Across five academic levels'],
                ['612+', 'Learning Topics', 'Structured and sequenced'],
                ['5,000+', 'Practice Questions', 'MCQs, problems, and more'],
              ].map(([val, lbl, sub]) => (
                <div key={lbl} className="flex gap-5">
                  <div className="font-serif font-bold text-3xl text-[var(--accent)] w-20 shrink-0">{val}</div>
                  <div>
                    <div className="font-semibold text-[var(--primary)]">{lbl}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">Our Approach</div>
            <h2 className="text-4xl font-serif font-bold text-[var(--primary)]">How SJ Law Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Structured Curriculum',
                body: 'Every course is broken into clearly sequenced topics that build knowledge progressively. Our curriculum maps directly to the Nigerian university law programme, ensuring relevance and alignment with your assessments.',
              },
              {
                title: 'Multiple Learning Modalities',
                body: 'Law students learn differently. SJ Law offers comprehensive written notes, video explanations, case law study, and active recall through practice questions  --  catering to every learning style.',
              },
              {
                title: 'Assessment-Ready Practice',
                body: 'Our practice section includes MCQs, problem questions, past examination questions, and timed mock examinations  --  all with detailed explanations, model answers, and performance feedback.',
              },
            ].map(item => (
              <div key={item.title} className="bg-[var(--muted)] rounded-2xl p-6 border border-[var(--border)]">
                <div className="w-10 h-1 bg-[var(--accent)] mb-4" />
                <h3 className="font-serif font-bold text-[var(--primary)] text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--primary)]">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Ready to begin?</h2>
          <p className="text-white/60 mb-8">Join thousands of Nigerian law students already learning on SJ Law Platform. Start your free trial today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup" className="px-8 py-3.5 bg-[var(--accent)] text-[var(--primary)] font-bold rounded-lg hover:bg-[#d4b862] transition-colors text-sm">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
