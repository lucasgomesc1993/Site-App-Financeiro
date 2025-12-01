import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
}

export function SEO({ title, description, canonical }: SEOProps) {
    const siteUrl = 'https://finzap.com.br'; // Replace with actual domain if known, or make it dynamic
    const fullCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : undefined;

    return (
        <Helmet>
            <title>{title} | FinZap</title>
            <meta name="description" content={description} />
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {fullCanonical && <meta property="og:url" content={fullCanonical} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}
