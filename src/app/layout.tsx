import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// check it out
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Emotion Crawler',
	description: 'Dungeon Crawler like game that allows you to learn and recognize emotions while exploring new dungeons',
};

export default function RootLayout({
	children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
