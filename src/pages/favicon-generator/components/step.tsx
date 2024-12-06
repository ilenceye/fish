import { cn } from '~/lib/cn';

type Props = {
  children: React.ReactNode;
  title: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export default function Step({ children, title, className }: Props) {
  return (
    <div className={cn('rounded bg-card', className)}>
      <div className="bg-secondary px-6 py-4">
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}
