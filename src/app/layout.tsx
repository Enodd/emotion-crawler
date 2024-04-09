import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import wrapper from '@/components/wrapper';
import { useTranslation } from 'next-i18next';

// check it out
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Emotion Crawler',
	description: 'Dungeon Crawler like game that allows you to learn and recognize emotions while exploring new dungeons',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({children}) => {
	const { t, i18n } = useTranslation();

	const handleLangChange = () => {
		if (i18n.language.toLowerCase() === 'en') {
			i18n.changeLanguage('pl');
		} else {
			i18n.changeLanguage('en');
		}
	};
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<h1>{t('test.hello')}</h1>
				<button onClick={handleLangChange}>{t('test.changeLang')}</button>
			</body>
		</html>
	);
};
export default wrapper(RootLayout);