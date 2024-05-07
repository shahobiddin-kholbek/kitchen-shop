'use client'
import { useLocale, useTranslations } from 'next-intl';
import { locales, usePathname, useRouter } from '@/navigation';
import ISO6391 from 'iso-639-1';
import { useEffect, useState } from 'react';

const languageCountryMapping: Record<string, string> = {
    en: 'gb',
    ru: 'ru',
    tj: 'tj',
};
const langs: any = [
    { en: 'EN' },
    { ru: 'РУ' },
    { tj: 'ТҶ' },
]
const getFlagImageUrl = (countryCode: any) => `https://flagcdn.com/20x15/${countryCode.toLowerCase()}.png`;

export default function LangSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();
    const [flagUrl, setFlagUrl] = useState('');

    useEffect(() => {
        const countryCode = languageCountryMapping[locale];
        const url = getFlagImageUrl(countryCode);
        setFlagUrl(url);
    }, [locale]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(pathName, { locale: e.target.value });
    };

    return (
        <label className="border-2 py-0 rounded flex items-center">
            <img src={flagUrl} alt={locale} width={20} height={25} />
            <select className=" border-0 outline-none cursor-pointer" value={locale} onChange={handleChange}>
                {locales.map((lang) => (
                    <option className='p-4 text-center' key={lang} value={lang}>
                        {lang === 'ru' ? 'РУ' : lang === 'tj' ? 'ТҶ' : lang.toUpperCase()}
                    </option>
                ))}
            </select>
        </label>
    )
}

