import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, MessageCircle, Instagram, Phone, MapPin, Clock } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import Layout from "../Layout";

const SIDEBAR_WIDTH = 260; // Ensure consistency with sidebar width

const contactMethods = [
	{
		icon: Mail,
		title: 'Email',
		subtitle: 'General Inquiries',
		contact: 'info@dymun2025.com',
		action: 'mailto:info@dymun2025.com',
		color: 'bg-blue-500',
	},
	{
		icon: MessageCircle,
		title: 'WhatsApp',
		subtitle: 'Quick Support',
		contact: '+91 86574 40454',
		action: 'https://wa.me/918657440454',
		color: 'bg-emerald-500',
	},
	{
		icon: Instagram,
		title: 'Instagram',
		subtitle: 'Follow Us',
		contact: '@dymun.nerul',
		action: 'https://www.instagram.com/dymun.nerul/',
		color: 'bg-pink-500',
	},
];

const teamContacts = [
	{
		name: 'Aayan Kumar',
		role: 'Secretary General',
		email: '',
		phone: '+91 86574 40454',
	},
	{
		name: 'Yuvraj Behera',
		role: 'Deputy Joint Secretary General',
		email: '',
		phone: '+91 86578 40015',
	},
	{
		name: 'Suvirr Menon',
		role: 'Deputy Joint Secretary General',
		email: '',
		phone: '+91 93219 91723',
	},
];

export default function Connect() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Layout currentPageName="Connect">
			<style>
				{`
					@keyframes popIn {
						0% {
							opacity: 0;
							transform: scale(0.8);
						}
						100% {
							opacity: 1;
							transform: scale(1);
						}
					}
					.animate-popIn {
						animation: popIn 500ms ease-out forwards;
					}
					@keyframes fadeSlideUp {
						0% {
							opacity: 0;
							transform: translateY(20px);
						}
						100% {
							opacity: 1;
							transform: translateY(0);
						}
					}
					.animate-fadeSlideUp {
						animation: fadeSlideUp 500ms ease-out forwards;
					}
				`}
			</style>
			<div
				className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full px-6 py-6"
				style={{
					paddingLeft: 32,
					paddingRight: 24,
					maxWidth: "1400px",
					overflowX: "hidden",
				}}
			>
				{/* Hero Section without committee image */}
				<section className="py-20 px-7 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-3xl shadow-2xl">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
							Connect With Us
						</h1>
						<p className="text-xl md:text-2xl text-blue-100 drop-shadow-md">
							Having questions? Need support? We&apos;re here to help make your DYMUN
							experience exceptional.
						</p>
					</div>
				</section>

				{/* Key Contacts Above */}
				<section className="py-12 px-6">
					<div className="max-w-6xl mx-auto">
						{isLoading ? (
							<div className="text-center">
								<Skeleton className="h-8 w-1/3 mx-auto mb-8 animate-pulse" />
								<div className="grid md:grid-cols-3 gap-6 mb-12">
									{Array(3).fill(0).map((_, i) => (
										<Skeleton key={i} className="h-32 w-full rounded-lg animate-pulse" />
									))}
								</div>
							</div>
						) : (
							<div className="text-center">
								<h3 className="text-3xl font-bold text-slate-900 mb-8 animate-fadeSlideUp" data-index="0">
									Key Contacts
								</h3>
								<div className="grid md:grid-cols-3 gap-6 mb-12">
									{teamContacts.map((member, index) => (
										<div
											key={index}
											className="animate-popIn"
											style={{ animationDelay: `${index * 100}ms` }}
											data-index={index}
										>
											<Card
												className="border-none shadow-lg bg-white/90 backdrop-blur-md transition-all duration-300"
											>
												<CardContent className="p-6 text-center flex flex-col items-center justify-center">
													<h4 className="text-xl font-bold text-slate-900 mb-2">
														{member.name}
													</h4>
													<p className="text-blue-600 font-medium mb-4">
														{member.role}
													</p>
													<div className="flex flex-row gap-3 w-full justify-center">
														<a
															href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-white text-slate-800 font-semibold text-base shadow hover:shadow-md transition-all duration-200 no-underline"
															style={{ textDecoration: 'none', color: '#1e293b', background: '#fff' }}
														>
															<Phone className="w-5 h-5" />
															<span>{member.phone}</span>
														</a>
													</div>
												</CardContent>
											</Card>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Contact Methods Below */}
				<section className="py-12 px-6">
					<div className="max-w-6xl mx-auto">
						{isLoading ? (
							<div className="text-center">
								<Skeleton className="h-10 w-1/3 mx-auto mb-12 animate-pulse" />
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
									{Array(3).fill(0).map((_, i) => (
										<Skeleton key={i} className="h-60 w-full rounded-lg animate-pulse" />
									))}
								</div>
								<div className="grid md:grid-cols-2 gap-8">
									{Array(2).fill(0).map((_, i) => (
										<Skeleton key={i} className="h-48 w-full rounded-lg animate-pulse" />
									))}
								</div>
							</div>
						) : (
							<div className="text-center">
								<h2 className="text-4xl font-bold text-slate-900 mb-12 animate-fadeSlideUp" data-index="1" style={{ animationDelay: "100ms" }}>
									Get In Touch
								</h2>
								<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
									{contactMethods.map((method, index) => (
										<div
											key={index}
											className="animate-popIn"
											style={{ animationDelay: `${index * 100}ms` }}
											data-index={index}
										>
											<Card
												className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group"
											>
												<CardHeader className="text-center pb-4">
													<div
														className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
													>
														<method.icon className="w-8 h-8 text-white" />
													</div>
													<CardTitle className="text-xl">{method.title}</CardTitle>
													<p className="text-sm text-slate-500">
														{method.subtitle}
													</p>
												</CardHeader>
												<CardContent className="text-center">
													<p className="font-semibold text-slate-800 mb-4">
														{method.contact}
													</p>
													<Button asChild className="w-full">
														<a
															href={method.action}
															target="_blank"
															rel="noopener noreferrer"
														>
															Contact Now
														</a>
													</Button>
												</CardContent>
											</Card>
										</div>
									))}
								</div>
								{/* Additional Information */}
								<div className="grid md:grid-cols-2 gap-8">
									{[
										{
											icon: <MapPin className="w-5 h-5 text-blue-600" />,
											title: "Location",
											content: (
												<>
													<p className="text-slate-600 mb-2">
														D Y Patil International School:
													</p>
													<p className="font-semibold text-slate-800 mb-4">
														Sector 7, Nerul, Navi Mumbai,<br />
														Maharashtra 400706
													</p>
													<Button variant="outline" asChild>
														<a
															href="https://maps.app.goo.gl/b8uQjjcyc6MyZfaC7"
															target="_blank"
															rel="noopener noreferrer"
														>
															View Directions
														</a>
													</Button>
												</>
											),
										},
										{
											icon: <Clock className="w-5 h-5 text-blue-600" />,
											title: "Support Hours",
											content: (
												<div className="space-y-2 text-slate-600">
													<p>
														<span className="font-semibold">Monday - Friday:</span> 9:00
														AM - 6:00 PM IST
													</p>
													<p>
														<span className="font-semibold">Saturday:</span> 10:00 AM -
														4:00 PM IST
													</p>
													<p>
														<span className="font-semibold">Sunday:</span> Closed
													</p>
													<p className="text-sm text-slate-500 mt-4">
														During conference days (Oct 10-11), support is available
														24/7.
													</p>
												</div>
											),
										},
									].map((card, index) => (
										<div
											key={index}
											className="animate-popIn"
											style={{ animationDelay: `${(index + 3) * 100}ms` }}
											data-index={index + 3}
										>
											<Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
												<CardHeader>
													<CardTitle className="flex items-center gap-2">
														{card.icon}
														{card.title}
													</CardTitle>
												</CardHeader>
												<CardContent>
													{card.content}
												</CardContent>
											</Card>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</section>
			</div>
		</Layout>
	);
}