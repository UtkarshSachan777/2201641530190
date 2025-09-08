import URLShortenerForm from "@/components/URLShortenerForm";

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Professional URL Shortener
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create short, trackable links with custom validity periods and detailed analytics. 
          Perfect for medical technology and enterprise applications.
        </p>
      </div>
      
      <URLShortenerForm />
    </div>
  );
};

export default Index;
