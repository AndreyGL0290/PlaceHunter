import { useState } from "react"
import ExpressStack from "../../components/TechStack/ExpressStack"
import NextStack from "../../components/TechStack/NextStack"

export default function AboutPage() {
    let stacks = {"1": NextStack, "2": ExpressStack}
    const [stack, changeStack] = useState(stacks["1"]());
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="my-10 grid grid-cols-2 grid-rows-2 gap-x-60 gap-y-10 tablet:grid-cols-1">
                <p className="w-80 text-xl col-start-1 row-start-1 text-justify phone:row-start-1 phone:col-start-1 tablet:row-start-1 tablet:col-start-1">PlaceHunter is a small project built to improve both my front and back end skills</p>
                <p className="w-80 text-xl col-start-2 row-start-2 text-justify phone:row-start-1 phone:col-start-1 tablet:row-start-2 tablet:col-start-1">It has two instances. This one is built using express.js and can be found <a href="https://github.com/AndreyGL0290/SportBook/blob/main" className="font-medium italic">~here~</a></p>
            </div>
            <p className="text-xl">Tech stack used in 
                <select className="text-center border-2 rounded-lg" name="instance-choose" id="instance-choose" onChange={(e) => {
                    changeStack(stacks[e.currentTarget.value]())
                }}>
                    <option value="1" label="first"></option>
                    <option value="2" label="second"></option>
                </select> instance</p>
            <div className="w-screen">
                <div id="tech-stack" className="text-center grid grid-cols-3 gap-y-10 phone:grid-cols-1 tablet:grid-cols-2">
                    {stack}
                </div>
            </div>
        </div>
    )
}