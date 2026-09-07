import Awards from "../components/Home/Awards";
import Education from "../components/Home/Education";
import Hero from "../components/Home/Hero";
import Stats from "../components/Home/Stats";
import OpenAccount from "../components/OpenAccount";
import Pricing from "./Pricing";

export default function Home() {
    return (
        <div>
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount />
        </div>
    )
}