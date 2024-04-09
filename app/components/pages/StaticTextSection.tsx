
// components/StaticTextSection.js
const StaticTextSection = () => {
    return (
      <main className="w-full mx-auto md:p-16 p-6 always-black-section mb-10">
        <div className="lg:max-w-[1150px] md:max-w-[650px] mx-auto max-w-full lg:gap-y-8 gap-y-12 mb-12">
          <h2 className="text-2xl font-bold mb-4 font-semibold ">Заголовок Секции</h2>
          <p className="light:text-zinc-400 text-slate-200 text-zinc-600 leading-relaxed">Это пример статического текста, который может быть использован на вашей странице. Вы можете заменить этот текст на любой другой, который вам нужен.</p>
          </div>
      </main>
    );
  };
 
  export default StaticTextSection;
  