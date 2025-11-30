type LoadingProps = {
  text: string;
};

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="loading-component">
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p>{text}</p>
      </div>
    </div>
  );
}
