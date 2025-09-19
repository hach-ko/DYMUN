import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Button } from "../components/ui/Button";
import { Users } from "lucide-react";

// Committee data (overview, chair, class, resources, image)
const committees = [
  {
    name: "Disney",
    img: "https://images.unsplash.com/photo-1605443790760-18c6121939d3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Primary School (Grades 3-5)",
    overview:
      "Delve into the world of magic and mystery as your favorite Disney characters transcend their utopian bounds to take on the world’s biggest dilemmas! With DYMUN’s Disney committee, primary students deliberate on the 21st century’s most baffling conundrums, except through the lens of their classic role models.",
    chair: "Fairy Godmother",
    resources: [],
  },
  {
    name: "FIFA",
    img: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Primary School (Grades 3-5)",
    overview: "",
    chair: "Gianni Infantino",
    resources: [],
  },
  {
    name: "Harry Potter",
    img: "https://images.unsplash.com/photo-1618944913480-b67ee16d7b77?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Primary School (Grades 3-5)",
    overview:
      "The Harry Potter universe brings forth an eclectic amalgamation of unparalleled camaraderie, courage and the sheer fascination of something so ambitiously magical. With DYMUN’s Harry Potter committee, this larger-than-life fantasy is complemented by pragmatic power and passion as young delegates step outside the pages of the books to take on the mantle of magical leaders that reshape their most cherished universe! ",
    chair: "Professor McGonagall",
    resources: [],
  },
  {
    name: "CTC",
    img: "https://plus.unsplash.com/premium_photo-1683134547428-f1c28addd588?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Middle School (Grades 6-8)",
    overview:
      "The United Nations Counter-Terrorism Committee (UN CTC) was established in 2001 by UN Security Council Resolution 1373 in response to the 9/11 attacks. Its objective is to monitor states’ implementation of counter-terrorism measures, including criminalizing terrorist financing, enhancing border controls, improving information sharing, and strengthening legal frameworks against terrorism. The CTC works through its Executive Directorate (CTED) to assess member states’ capacities, provide technical assistance, and ensure compliance with international obligations while respecting human rights and international law.",
    chair: "Ms. Radhika Singh",
    resources: [],
  },
  {
    name: "UNOOSA",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    class: "Middle School (Grades 6-8)",
    overview:
      "UNOOSA is tasked with promoting the peaceful, sustainable, and cooperative use of outer space, ensuring that space exploration and technology remain accessible to all states. The committee’s purpose is to develop frameworks that regulate emerging space activities, mitigate risks such as weaponization and space debris, and advance equitable access to space-based technologies for development. By fostering multilateral dialogue and codifying norms, delegates work to ensure that outer space remains a domain of shared progress and global security rather than competition and conflict.",
    chair: "Dr. Lars Müller",
    resources: [],
  },
  {
    name: "IPL",
    img: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?q=80&w=1357&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Middle School (Grades 6-8)",
    overview: "",
    chair: "Mr. Virat Kohli",
    resources: [],
  },
  {
    name: "SDG 5",
    img: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "Middle School (Grades 6-8)",
    overview:
      "SDG 5 aims to dismantle entrenched gender disparities by advancing policies that ensure women' s agency, representation and equal opportunity. DYMUN's SDG 5 committee efficaciously strives to focus on international collaboration, mobilize resources and shape frameworks that translate visions into reinforceable action. By mainstreaming inclusion across all sectors, delegates will get a chance to work towards the goal of establishing gender equality as a key driver of sustainable development rather than a peripheral idea.",
    chair: "Ms. Chloe Dubois",
    resources: [],
  },
  {
    name: "ECOFIN",
    img: "https://images.unsplash.com/photo-1607037183811-2a54d746cd35?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "High School (Grades 9-12)",
    overview:
      "In this committee, economics perennially outrivals the sterile formulae and graphs that are believed to shape it, epitomising living, breathing narratives of resilience, power, and inequality. DYMUN’s ECOFIN committee invites delegates to interact with the forces that shape nations, reminding them that each decision made here has the potency to reinvent the intricate (and ever so fragile) tapestry of global trade and politics.",
    chair: "Mr. Charles Dubois",
    resources: [],
  },
  {
    name: "AIPPM",
    img: "https://images.unsplash.com/photo-1596574027151-2ce81d85af3e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "High School (Grades 9-12)",
    overview: "",
    chair: "Mr. Rajiv Menon",
    resources: [],
  },
  {
    name: "UNSC",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    class: "High School (Grades 9-12)",
    overview:
      "The UNSC bears primary responsibility for the maintenance of international peace and security, empowered to mandate binding resolutions, authorize interventions, and impose sanctions. In this committee, delegates aim to negotiate collective responses to emerging threats, balance state sovereignty with humanitarian imperatives, and ensure that peacekeeping and conflict-resolution efforts are both legitimate and effective. The Council’s work is defined by urgency, authority, and the need for consensus among diverse national interests, making it the most pivotal arena for global security governance.",
    chair: "Eleanor Vance",
    resources: [],
  },
  {
    name: "ICJ",
    img: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "High School (Grades 9-12)",
    overview: "",
    chair: "Ms. Fatima Al-Jamil",
    resources: [],
  },
  {
    name: "HCC",
    img: "https://plus.unsplash.com/premium_photo-1682125784386-d6571f1ac86a?q=80&w=908&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "High School (Grades 9-12)",
    overview: "",
    chair: "Dr. Aris Patel",
    resources: [],
  },
  {
    name: "IP",
    img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    class: "High School (Grades 9-12)",
    overview: "",
    chair: "Ms. Hannah Weiss",
    resources: [],
  },
];

export default function CommitteeInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const committeeName = params.name;
  const committee = committees.find(
    (c) => c.name.toLowerCase() === (committeeName || "").toLowerCase()
  );

  if (!committee) {
    return (
      <Layout currentPageName="CommitteeInfo">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
          <div className="max-w-md w-full bg-white/90 rounded-xl shadow-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Committee Not Found</h2>
            <p className="text-slate-600 mb-6">Sorry, we couldn't find information for this committee.</p>
            <Button onClick={() => navigate(-1)} variant="primary">Go Back</Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Animation state
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Sidebar width (same as SIDEBAR_WIDTH in Home.jsx)
  const SIDEBAR_WIDTH = 260;

  return (
    <Layout currentPageName="CommitteeInfo">
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ marginLeft: SIDEBAR_WIDTH, maxWidth: 'calc(100vw - 40px - ' + SIDEBAR_WIDTH + 'px)', transition: 'margin-left 0.5s cubic-bezier(.4,0,.2,1)' }}
      >
        <div className="max-w-3xl mx-auto bg-white/90 rounded-xl shadow-2xl overflow-hidden">
          <div className="relative h-64 w-full overflow-hidden">
            <img
              src={committee.img}
              alt={committee.name}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 bg-white/80 rounded-xl px-4 py-2 shadow-lg">
              <span className="text-lg font-bold text-blue-700">{committee.name}</span>
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">DYMUN Committee Brief</h2>
            {committee.overview && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Overview</h3>
                <p className="text-slate-700 text-base leading-relaxed">{committee.overview}</p>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Chair / Co-Chairs</h3>
              <div className="flex items-center gap-2 text-slate-800">
                <Users className="w-5 h-5" />
                <span className="font-medium">{committee.chair || "TBA"}</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Grade Level</h3>
              <span className="inline-block bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">{committee.class}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Resources</h3>
              {committee.resources && committee.resources.length > 0 ? (
                <ul className="list-disc pl-6 text-slate-700">
                  {committee.resources.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">No resources available yet.</p>
              )}
            </div>
            {/* Add more info sections as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
