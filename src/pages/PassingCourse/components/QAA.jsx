import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { ArrowBorder, ChevronDown, Message, Search } from '../../../ui/icons';
import CustomSelect from './CustomSelect'

const questionsData = [
    { id: 1, user: 'Alice', question: 'How to use React hooks?', date: '2024-02-25', important: true, answered: true },
    { id: 2, user: 'Bob', question: 'What is Redux Toolkit?', date: '2024-02-24', important: false, answered: false },
    { id: 3, user: 'Charlie', question: 'How to improve performance in React?', date: '2024-02-20', important: true, answered: true },
];

const QAA = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('newest');

    const filteredQuestions = questionsData
        .filter(q => q.question.toLowerCase().includes(search.toLowerCase()))
        .filter(q => {
            if (filter === 'important') return q.important;
            if (filter === 'answered') return q.answered;
            if (filter === 'unanswered') return !q.answered;
            return true;
        })
        .sort((a, b) => {
            if (sort === 'newest') return new Date(b.date) - new Date(a.date);
            if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
            if (sort === 'alphabetical') return a.question.localeCompare(b.question);
            return 0;
        });

    return (
        <div className="">
            <div className="flex items-center border rounded-xl pl-2 w-full bg-gray-100">
                <input
                    type="text"
                    placeholder="Search questions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent outline-none"
                />
                <div className="cursor-pointer bg-[#402D1D] h-full w-[15%] sm:w-[5%] flex justify-center items-center p-2" style={{ borderRadius: '0px 12px 12px 0' }}>
                    <Search />
                </div>
            </div>

            <div className="flex my-4 flex-wrap sm:flex-nowrap justify-between gap-3">
                <CustomSelect
                    options={[
                        { value: "all", label: "All lectures" },
                        { value: "important", label: "Important" },
                        { value: "answered", label: "Answered" },
                        { value: "unanswered", label: "Unanswered" }
                    ]}
                    defaultValue="all"
                    onChange={setFilter}
                    widthPc='25%'
                    widthMob='48%'
                />

                <CustomSelect
                    options={[
                        { value: "newest", label: "Sort by recommended" },
                        { value: "oldest", label: "Oldest" },
                        { value: "alphabetical", label: "Alphabetical" }
                    ]}
                    defaultValue="newest"
                    onChange={setSort}
                    widthPc='35%'
                    widthMob='48%'
                />

                <CustomSelect
                    options={[
                        { value: "newest", label: "Filter questions" },
                        { value: "oldest", label: "Oldest" },
                        { value: "alphabetical", label: "Alphabetical" }
                    ]}
                    defaultValue="newest"
                    onChange={setSort}
                    widthPc='35%'
                    widthMob='100%'
                />
            </div>

            <h2 className='text-lg font-semibold'>All questions for this course <span className='text-[#919191]'>({filteredQuestions.length})</span></h2>

            <div className="mt-4">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(q => (
                        <div key={q.id} className="p-4 bg-[#FFF7F1] rounded-xl mb-3">
                            <div className='lg:flex sm:flex gap-8 justify-between'>
                                <div className='flex gap-5 w-[90%]'>
                                    <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#402D1D] text-[#FFF] text-[20px] font-semibold">
                                        VS
                                    </div>
                                    <div className="w-[70%]">
                                        <div>
                                            <p className="text-lg font-semibold">{q.user}</p>
                                            <p className="text-[#402D1D] font-light">{q.question}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row sm:flex-col gap-5 text-right items-end justify-end pt-2'>
                                    <p className='flex font-medium items-center gap-2'>47 <ArrowBorder /></p>
                                    <p className='flex font-medium items-center gap-2'>247 <Message /></p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-[100%] sm:w-[90%] pt-5 pl-0 sm:pl-[70px]'>
                                <div className='flex gap-3 items-center text-[#402D1D] font-light'>
                                    <p className="text-sm">Victoria</p>
                                    <p className="text-sm">Lecture 2</p>
                                    <p className="text-sm">{q.date}</p>
                                </div>
                                <button>Reply</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No questions found.</p>
                )}
            </div>
            <button className='w-full py-2 bg-[#C6A982] rounded-xl text-base font-medium text-[#FFF]'>
                See more
            </button>
        </div>
    );
};

export default QAA;
