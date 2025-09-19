import React, { useRef, useEffect } from "react";
import Layout from "../Layout";
import { Button } from "../components/ui/Button";
import { Users, ArrowRight } from "lucide-react";
import Logo from "../assets/DYMUN.png";

const SIDEBAR_WIDTH = 260;

// Committees data (with updated images for SDG 5, ECOFIN, HCC, IP)
const committeeGroups = [
	{
		title: "Primary School (Grades 3-5)",
		color: "from-green-500 to-emerald-500",
		badge: "bg-green-100 text-green-800 border-green-300",
		committees: [
			{
				name: "Harry Potter",
				subtitle: "Harry Potter: Rebuilding the Wizarding World",
				topic: "Addressing Infrastructure, Governance, and Social Healing in the Aftermath of the Battle of Hogwarts",
				chair: "Professor McGonagall",
				level: "Primary School",
				img: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "Disney",
				subtitle: "Disney: Regulating the Use of Magic",
				topic: "Should Magical Abilities Be Governed by Law or Freely Practiced by All",
				chair: "Fairy Godmother",
				level: "Primary School",
				img: "https://images.unsplash.com/photo-1605443790760-18c6121939d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "FIFA",
				subtitle: "FIFA: Combating Discrimination in Football",
				topic: "Combating Discrimination and Social Inequality in Global Football.",
				chair: "Gianni Infantino",
				level: "Primary School",
				img: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		],
	},
	{
		title: "Middle School (Grades 6-8)",
		color: "from-yellow-500 to-orange-500",
		badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
		committees: [
			{
				name: "CTC",
				subtitle: "CTC (Counter-Terrorism Committee)",
				topic: "Deliberating Strategies to Disrupt Terrorist Financing Networks and Curb the Use of Illicit Financial Channels",
				chair: "Ms. Radhika Singh",
				level: "Middle School",
				img: "https://plus.unsplash.com/premium_photo-1683134547428-f1c28addd588?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "UNOOSA",
				subtitle: "UNOOSA (Outer Space Affairs)",
				topic: "Global Framework to Prevent the Weaponization of Space-Based Technologies and Aggressive Militarization",
				chair: "Dr. Lars Müller",
				level: "Middle School",
				img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
			},
			{
				name: "IPL",
				subtitle: "IPL (Indian Premier League): AUCTION",
				topic: "IPL Auction Simulation",
				chair: "Mr. Virat Kohli",
				level: "Middle School",
				img: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?q=80&w=1357&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "SDG 5",
				subtitle: "SDG 5 (Gender Equality)",
				topic: "Addressing gender-based disparities in Representation in Political Institutions and Decision-Making Processes.",
				chair: "Ms. Chloe Dubois",
				level: "Middle School",
				img: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		],
	},
	{
		title: "High School (Grades 9-12)",
		color: "from-red-500 to-pink-500",
		badge: "bg-red-100 text-red-800 border-red-300",
		committees: [
			{
				name: "ECOFIN",
				subtitle: "ECOFIN (Economic and Financial Committee)",
				topic: "Dollar Dominance: Deliberating on shifting towards a multi-currency system for trading.",
				chair: "Mr. Charles Dubois",
				level: "High School",
				img: "https://images.unsplash.com/photo-1607037183811-2a54d746cd35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "UNSC",
				subtitle: "UNSC (Security Council)",
				topic: "Role of Non State Actors and Private Military Contractors for the Situation in the Sahel: Terrorism, Coups, and Regional Instability",
				chair: "Eleanor Vance",
				level: "High School",
				img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
			},
			{
				name: "AIPPM",
				subtitle: "AIPPM (All India Political Party Meet)",
				topic: "Deliberation on Enhancing Judicial Efficiency and Accountability in India whilst Balancing Legal Reform, Transparency, and Public Trust",
				chair: "Mr. Rajiv Menon",
				level: "High School",
				img: "https://images.unsplash.com/photo-1596574027151-2ce81d85af3e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "ICJ",
				subtitle: "ICJ (International Court of Justice)",
				topic: "Application of the Convention on the Prevention and Punishment of the Crime of Genocide in Sudan (Sudan v. United Arab Emirates)",
				chair: "Ms. Fatima Al-Jamil",
				level: "High School",
				img: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "HCC",
				subtitle: "HCC (Historical Crisis Committee)",
				topic: "Accountability for Nuclear Brinkmanship During the Cold War considering the Cuban Missile Crisis, Berlin standoffs, and general US-USSR nuclear threats. (Freeze date: February 15, 1989)",
				chair: "Dr. Aris Patel",
				level: "High School",
				img: "https://plus.unsplash.com/premium_photo-1682125784386-d6571f1ac86a?q=80&w=908&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
			{
				name: "IP",
				subtitle: "IP (International Press)",
				topic: "International Press",
				chair: "Ms. Hannah Weiss",
				level: "High School",
				img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			},
		],
	},
];

export default function Home() {
	// All committee names for buttons
	const allCommittees = committeeGroups.flatMap((g) => g.committees.map((c) => c.name));
	// Refs for each committee card
	const committeeRefs = {};
	committeeGroups.forEach((group) => {
		group.committees.forEach((c) => {
			committeeRefs[c.name] = useRef();
		});
	});

	// Button click scroll handler
	const handleCommitteeClick = (name) => {
		const ref = committeeRefs[name];
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	// Scroll to top on page mount
	// Scroll to top on page mount and route change
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, []); // Added dependency array to ensure it runs on mount

	// Custom styles for committee buttons (no underline, always white, no blue)
	const committeeBtn =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:text-white hover:no-underline h-10 px-4 py-2 select-none";
	const btnStyle = {
		boxShadow: "0 2px 8px 0 rgba(60,60,120,0.07)",
		transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
		fontWeight: 500,
		textDecoration: "none",
		userSelect: "none",
	};

	// Prepare committee cards segregated by group
	const committeeCardsByGroup = committeeGroups.map((group) => ({
		groupTitle: group.title,
		committees: group.committees.map((c) => ({
			...c,
			badge: group.badge,
		})),
	}));

	return (
		<Layout currentPageName="Home">
			<div
				className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
				style={{
					marginLeft: `${SIDEBAR_WIDTH}px`,
					paddingLeft: 32,
					paddingRight: 24,
					maxWidth: "1400px",
					marginRight: "auto",
				}}
			>
				{/* Hero Section */}
				<section className="relative px-6 pt-12 pb-24 max-w-7xl mx-auto">
					<div className="text-center">
						<div className="flex justify-center mb-8">
							{/* Logo can go here if needed */}
						</div>
						<h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
							Welcome to{" "}
							<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
								DYMUN
							</span>
						</h1>
						<p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-4xl mx-auto leading-relaxed">
							An exciting platform for students from{" "}
							<span className="font-bold text-blue-600">Primary to High School</span> to sharpen their Model United Nations skills. Step into the
							shoes of global leaders and shape the future through diplomacy.
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
							<Button
								icon={<ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />}
								size="large"
								variant="primary"
								asChild
								style={{ minWidth: 200, fontWeight: 600 }}
							>
								<a href="/Resources">Resources</a>
							</Button>
							<div className="flex items-center gap-2 text-slate-700">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
									className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor"
									strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                </svg>
                                <span className="font-semibold text-lg">Two-day immersive experience</span>
                            </div>
						</div>
						{/* School Cards */}
						<div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
							<div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
								<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
										<path d="M22 10v6"></path>
										<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
									</svg>
								</div>
								<div>
									<p className="font-bold text-slate-900">Primary School</p>
									<p className="text-sm text-slate-600">Grades 3-5</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
								<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
										<path d="M22 10v6"></path>
										<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
									</svg>
								</div>
								<div>
									<p className="font-bold text-slate-900">Middle School</p>
									<p className="text-sm text-slate-600">Grades 6-8</p>
								</div>
							</div>
							<div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
								<div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
										<path d="M22 10v6"></path>
										<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
									</svg>
								</div>
								<div>
									<p className="font-bold text-slate-900">High School</p>
									<p className="text-sm text-slate-600">Grades 9-12</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Available Committees */}
				<section className="px-6 py-20 max-w-7xl mx-auto">
					<h2 className="text-5xl font-bold text-center text-slate-900 mb-6">
						Available Committees
					</h2>
					<p className="text-xl text-center text-slate-600 mb-10 max-w-3xl mx-auto">
						Choose from a diverse range of committees tailored for different grade levels and experience.
					</p>
					{/* Committee Filter Buttons */}
					<div className="mb-10 flex flex-wrap gap-2 justify-center">
						{allCommittees.map((name) => (
							<button
								key={name}
								className={committeeBtn}
								style={btnStyle}
								onClick={() => handleCommitteeClick(name)}
								tabIndex={0}
							>
								{name}
							</button>
						))}
					</div>
					{/* Segregated committees by school group */}
					{committeeCardsByGroup.map((group) => (
						<div key={group.groupTitle} className="mb-16">
							<h3 className="text-3xl font-bold text-slate-800 mb-6 text-left md:text-center">{group.groupTitle}</h3>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
								{group.committees.map((c) => (
									<div
										key={c.name}
										ref={committeeRefs[c.name]}
										className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm group hover:-translate-y-1 hover:scale-105 flex flex-col justify-between"
										style={{ userSelect: "none" }}
									>
										<div className="relative overflow-hidden rounded-t-xl h-48">
											<img
												src={c.img}
												alt={c.subtitle}
												className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
												draggable={false}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
											<div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold absolute top-4 right-4 transition-all duration-300 group-hover:scale-110 shadow-lg border-2 ${c.badge}`}>
												{c.level}
											</div>
										</div>
										<div className="flex flex-col space-y-1.5 p-6 pt-6">
											<h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 select-none">{c.name}</h3>
											<p className="text-sm text-slate-600 font-medium h-12 leading-tight select-none">{c.subtitle}</p>
										</div>
										<div className="p-6 pt-0">
											<p className="text-sm text-slate-500 line-clamp-3 h-16 leading-relaxed select-none">{c.topic}</p>
											<div className="mt-4 flex items-center gap-2 text-xs text-slate-400 select-none">
												<Users className="w-3 h-3" />
												<span>Chair: {c.chair}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</section>

				{/* Why Join DYMUN */}
				<section className="px-6 py-20 bg-white/60 backdrop-blur-md select-none">
					<div className="max-w-7xl mx-auto">
						<h2 className="text-5xl font-bold text-center text-slate-900 mb-6">
							Why Join DYMUN?
						</h2>
						<p className="text-xl text-center text-slate-600 mb-16 max-w-4xl mx-auto">
							Experience the thrill of international diplomacy while building
							lifelong skills and friendships across all educational levels
						</p>
						<div className="grid md:grid-cols-3 gap-6">
							{[
								{
									icon: <Users className="w-8 h-8 text-white" />,
									bg: "from-blue-500 to-cyan-500",
									title: "Diverse Community",
									desc: "Connect with passionate students from different schools and backgrounds across all grade levels",
								},
								{
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-8 h-8 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
											<path d="M2 12h20"></path>
										</svg>
									),
									bg: "from-purple-500 to-pink-500",
									title: "Real-World Issues",
									desc: "Debate and negotiate solutions to pressing global challenges tailored to your experience level",
								},
								{
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-8 h-8 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
											<circle cx="12" cy="8" r="6"></circle>
										</svg>
									),
									bg: "from-orange-500 to-red-500",
									title: "Leadership Skills",
									desc: "Develop critical thinking, public speaking, and diplomatic abilities through immersive simulations",
								},
							].map((card, idx) => (
								<div key={card.title} className="select-none">
									<div className={`rounded-lg border border-blue-200 text-card-foreground shadow-xl transition-all duration-300 h-full bg-white/90 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-2xl p-4`}> {/* Reduced padding */}
										<div className="flex flex-col space-y-1.5 text-center pb-4"> {/* Reduced padding */}
											<div className={`w-14 h-14 bg-gradient-to-br ${card.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
												{card.icon}
											</div>
											<h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 select-none">
												{card.title}
											</h3>
										</div>
										<div>
											<p className="text-slate-600 text-center leading-relaxed text-base select-none">
												{card.desc}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA */}
				<section className="px-6 py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden rounded-t-3xl shadow-2xl">
					<div className="absolute inset-0 bg-black/10"></div>
					<div className="relative max-w-5xl mx-auto text-center">
						<h2 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
							Ready to Shape the Future?
						</h2>
						<p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-md">
							Whether you're a primary school student taking your first steps in
							diplomacy or a seasoned high school delegate, DYMUN 2025 promises an
							unforgettable experience of growth, challenge, and global engagement.
						</p>
						<Button
							icon={<ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />}
							size="medium"
							variant="primary"
							asChild
							style={{ minWidth: 180, fontWeight: 600, background: "#fff", color: "#2563eb", userSelect: "none" }}
						>
							<a href="/Register" style={{ userSelect: "none" }}>Join DYMUN 2025</a>
						</Button>
					</div>
				</section>
			</div>
		</Layout>
	);
}