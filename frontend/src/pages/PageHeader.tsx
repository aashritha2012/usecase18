import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
