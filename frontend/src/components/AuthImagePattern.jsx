const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 h-full overflow-hidden lg:p-6 xl:p-8 2xl:p-12">
      <div className="w-full text-center flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-2 lg:gap-2.5 xl:gap-3 mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 w-full lg:max-w-[240px] xl:max-w-[280px] 2xl:max-w-sm">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl 2xl:rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        
        <div className="px-4 lg:max-w-[280px] xl:max-w-[320px] 2xl:max-w-md">
          <h2 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold mb-2 lg:mb-2.5 xl:mb-3 2xl:mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-xs lg:text-sm xl:text-sm 2xl:text-base text-base-content/60 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;