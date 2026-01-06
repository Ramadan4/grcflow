interface PolicyHelpCardProps {
  title?: string;
  message?: string;
}

const PolicyHelpCard = ({ 
  title = "Help", 
  message = "Need assistance? Check our policy creation guide or contact support." 
}: PolicyHelpCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default PolicyHelpCard;
