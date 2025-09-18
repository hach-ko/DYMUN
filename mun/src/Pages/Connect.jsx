import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, MessageCircle, Instagram, Twitter, Phone, MapPin, Clock } from 'lucide-react';
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
		icon: Phone,
		title: 'Phone',
		subtitle: 'Call Us',
		contact: '+1 (555) 123-4567',
		action: 'tel:+15551234567',
		color: 'bg-green-500',
	},
	{
		icon: MessageCircle,
		title: 'WhatsApp',
		subtitle: 'Quick Support',
		contact: '+1 (555) 987-6543',
		action: 'https://wa.me/15559876543',
		color: 'bg-emerald-500',
	},
	{
		icon: Instagram,
		title: 'Instagram',
		subtitle: 'Follow Us',
		contact: '@dymun2025',
		action: 'https://instagram.com/dymun2025',
		color: 'bg-pink-500',
	},
	{
		icon: Twitter,
		title: 'Twitter',
		subtitle: 'Latest Updates',
		contact: '@DYMUN2025',
		action: 'https://twitter.com/dymun2025',
		color: 'bg-sky-500',
	},
];

const teamContacts = [
	{
		name: 'John Doe',
		role: 'Secretary General',
		email: 'secretary@dymun2025.com',
		phone: '+1 (555) 111-2222',
	},
	{
		name: 'Jane Smith',
		role: 'Director General',
		email: 'director@dymun2025.com',
		phone: '+1 (555) 333-4444',
	},
	{
		name: 'Sam Wilson',
		role: 'Head of Organizing Committee',
		email: 'organizing@dymun2025.com',
		phone: '+1 (555) 555-6666',
	},
];

export default function Connect() {
	return (
		<Layout currentPageName="Connect">
			<div
				className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
				style={{
					marginLeft: `${SIDEBAR_WIDTH}px`,
					paddingLeft: 32,
					paddingRight: 24,
					maxWidth: "1400px",
					marginRight: "auto",
					overflowX: "hidden",
				}}
			>
				{/* Hero Section */}
				<section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
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

				{/* Contact Methods */}
				<section className="py-20 px-6">
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
							Get In Touch
						</h2>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
							{contactMethods.map((method, index) => (
								<Card
									key={index}
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
							))}
						</div>

						{/* Team Contacts */}
						<div className="mb-16">
							<h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">
								Key Contacts
							</h3>
							<div className="grid md:grid-cols-3 gap-6">
								{teamContacts.map((member, index) => (
									<Card
										key={index}
										className="border-none shadow-lg bg-white/80 backdrop-blur-sm"
									>
										<CardContent className="p-6 text-center">
											<h4 className="text-xl font-bold text-slate-900 mb-2">
												{member.name}
											</h4>
											<p className="text-blue-600 font-medium mb-4">
												{member.role}
											</p>
											<div className="space-y-2">
												<Button
													variant="outline"
													size="sm"
													asChild
													className="w-full"
												>
													<a href={`mailto:${member.email}`}>
														<Mail className="w-4 h-4 mr-2" />
														Email
													</a>
												</Button>
												<Button
													variant="outline"
													size="sm"
													asChild
													className="w-full"
												>
													<a
														href={`tel:${member.phone.replace(
															/[^\d+]/g,
															''
														)}`}
													>
														<Phone className="w-4 h-4 mr-2" />
														Call
													</a>
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>

						{/* Additional Information */}
						<div className="grid md:grid-cols-2 gap-8">
							<Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<MapPin className="w-5 h-5 text-blue-600" />
										Location
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-slate-600 mb-2">
										DYMUN 2025 Conference Venue:
									</p>
									<p className="font-semibold text-slate-800 mb-4">
										Grand Conference Center
										<br />
										123 Diplomatic Drive
										<br />
										New York, NY 10001
									</p>
									<Button variant="outline" asChild>
										<a
											href="https://maps.google.com"
											target="_blank"
											rel="noopener noreferrer"
										>
											View on Map
										</a>
									</Button>
								</CardContent>
							</Card>

							<Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Clock className="w-5 h-5 text-blue-600" />
										Support Hours
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-2 text-slate-600">
										<p>
											<span className="font-semibold">Monday - Friday:</span> 9:00
											AM - 6:00 PM EST
										</p>
										<p>
											<span className="font-semibold">Saturday:</span> 10:00 AM -
											4:00 PM EST
										</p>
										<p>
											<span className="font-semibold">Sunday:</span> Closed
										</p>
										<p className="text-sm text-slate-500 mt-4">
											During conference days (Oct 10-11), support is available
											24/7.
										</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-20 px-6 bg-white/50 backdrop-blur-md">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold text-slate-900 mb-8">
							Frequently Asked Questions
						</h2>
						<p className="text-xl text-slate-600 mb-8">
							Can&apos;t find what you&apos;re looking for? Check out our
							comprehensive FAQ section or contact us directly.
						</p>
						<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
							View FAQ
						</Button>
					</div>
				</section>
			</div>
		</Layout>
	);
}