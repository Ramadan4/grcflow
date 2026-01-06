import { cn } from "@/lib/utils";

interface PolicyStatusBadgeProps {
  status: "published" | "draft" | "under-review";
}

const PolicyStatusBadge = ({ status }: PolicyStatusBadgeProps) => {
  const statusConfig = {
    published: {
      label: "Published",
      className: "bg-success/10 text-success",
    },
    draft: {
      label: "Draft",
      className: "bg-info/10 text-info",
    },
    "under-review": {
      label: "Under Review",
      className: "bg-warning/10 text-warning",
    },
  };

  const config = statusConfig[status];

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default PolicyStatusBadge;
