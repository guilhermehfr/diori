import clsx from "clsx";

type SpinProps = {
  className?: string;
};

export function SpinLoader({ className }: SpinProps): React.ReactNode {
  const classes = clsx("flex items-center justify-center", className);

  return (
    <div className={classes}>
      <div
        className={clsx(
          "w-10 h-10",
          "border-5 border-t-transparent border-slate-900",
          "rounded-full",
          "animate-spin",
        )}
      />
    </div>
  );
}
