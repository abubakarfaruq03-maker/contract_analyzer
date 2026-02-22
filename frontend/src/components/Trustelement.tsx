import React from 'react';
import { SiGoldmansachs, SiYcombinator, SiVisa, SiStripe, SiDeepl } from 'react-icons/si';
interface TrustedCompany {
    name: string;
    Icon: React.ElementType;
}

const TRUSTED_COMPANIES: TrustedCompany[] = [
    { name: "Goldman Sachs", Icon: SiGoldmansachs },
    { name: "Y Combinator", Icon: SiYcombinator },
    { name: "Visa", Icon: SiVisa },
    { name: "Stripe", Icon: SiStripe },
    { name: "Deepl", Icon: SiDeepl },
];

export default function TrustElement() {
    return (
        <div className="mt-24 pt-12 border-t border-border-line/50 w-full max-w-5xl mx-auto">
            <p className="text-center text-[10px] md:text-xs uppercase tracking-[0.3em] text-secondary-text font-bold mb-12 opacity-60">
                Powering Legal Intelligence for Global Teams
            </p>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 px-4">
                {TRUSTED_COMPANIES.map((company) => (
                    <div 
                        key={company.name} 
                        className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    >
                        <company.Icon 
                            className="
                                text-3xl md:text-4xl
                                transition-all duration-500
                                text-secondary-text opacity-40 
                                group-hover:opacity-100 group-hover:text-primary
                            " 
                        />
                    </div>
                ))}
            </div>
            <p className='text-sm text-secondary-text text-center opacity-50 mt-6 '>Badges are used for identification only and do not imply endorsement.</p>
        </div>
    );
}