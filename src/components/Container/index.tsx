import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <div className={clsx("min-h-screen", "text-slate-900", "bg-slate-100")}>
        <div className={clsx("max-w-screen-5xl mx-auto px-[10vw] ")}>
          {children}
        </div>
      </div>
    </>
  );
};
