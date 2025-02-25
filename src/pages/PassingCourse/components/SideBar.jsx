import React, { useState } from 'react';
import { BottomAcc, Check, Exit, FileWord, LockAcc, NoCheck, TopAcc, Video } from "../../../ui/icons";
import styled from 'styled-components';


const ButtonAcc = styled.button`
    @media(max-width: 1032px) {
        display: block;
        flex-direction: column;
    }
`;

const SideBar = () => {

    const [activeTab, setActiveTab] = useState("Course");
    const [checked, setChecked] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const content = {
        "Course": {
            title: "Inaugural Lecture",
            details: "8 Topics | 66 Lectures | Total duration: 56 hours 18 minutes",
            items: [
                "Topic 1: Introductory Lecture",
                "Topic 2: Introductory Lecture",
                "Topic 3: Introductory Lecture"
            ]
        },
    }
    return (
        <div className='w-[100%] first-letter:'>
            <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-semibold py-2'>Inaugural Lecture</h2>
                <Exit />
            </div>
            <div className='flex sm:hidden text-sm justify-between items-center pt-2 pb-4'>
                <p>8 Topics</p>
                <p> 66 Lectures</p>
                <p>Total duration: 56 hours <br /> 18 minutes</p>
            </div>
            <div className='rounded-xl sm:rounded-none bg-[#f7f7f7]'>
                {
                    content[activeTab].items.map((item, index) => (
                        <div key={index}>
                            <ButtonAcc
                                onClick={() => toggleAccordion(index)}
                                style={{ border: '1px solid #e1e1e1' }}
                                className={` flex flex-col text-sm py-4 px-4 text-left bg-[#f7f7f7] focus:outline-none justify-between w-full rounded-none sm:rounded-none`}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">{item}</p>
                                    {openAccordion === index ? <TopAcc /> : <BottomAcc />}
                                </div>
                                <div className="flex items-center justify-start gap-5">
                                    <p className="font-normal">1 lecture</p>
                                    <p className="font-medium"><span className="text-[#1E1E1E] opacity-80">Teacher:</span> John Doe</p>
                                </div>
                            </ButtonAcc>
                            {openAccordion === index && (
                                <div className={`p-4 flex gap-2 ${checked ? 'bg-[#FFEBDA]' : 'bg-[#FFF]'}`}>
                                    <label className="flex cursor-pointer">
                                        <input type="checkbox" onChange={() => setChecked(!checked)} className="hidden" />
                                        {checked ? <Check /> : <NoCheck />}
                                    </label>
                                    <div>
                                        <div className="text-sm flex items-center">
                                            <span className='text-base'>lecture name1</span>
                                        </div>
                                        <div className="py-2 text-sm flex items-center">
                                            <p className='font-light pr-2'>Material:</p>
                                            <div className={`flex items-center gap-1 rounded-lg ${checked ? "bg-[#FFF]" : "bg-[#C6A982]"} px-2 py-1`}>
                                                <FileWord />
                                                <a href="/path-to-word-file.docx" download className={`${checked ? "text-[#000]" : "text-[#FFF]"}`}>Lecture1: Lecture name</a>
                                            </div>

                                        </div>
                                        <div className=" text-sm flex items-center">
                                            <p className=' pr-2'>Video recording:</p>
                                            <span className='flex text-[#625c56] items-center gap-2'> <Video className="text-red-500 mr-2" size={20} /> 10 мин</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default SideBar;