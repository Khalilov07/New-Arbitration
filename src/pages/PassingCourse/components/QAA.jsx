import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { ChevronDown, Search } from '../../../ui/icons';
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

            <div className="flex justify-between my-4 flex-wrap gap-3">
                <CustomSelect
                    options={[
                        { value: "all", label: "All lectures" },
                        { value: "important", label: "Important" },
                        { value: "answered", label: "Answered" },
                        { value: "unanswered", label: "Unanswered" }
                    ]}
                    defaultValue="all"
                    onChange={setFilter}
                    width='25%'
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
                    width='35%'
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
                    width='35%'
                    widthMob='100%'
                />
            </div>

            <h2 className='text-lg font-semibold'>All questions for this course <span className='text-[#919191]'>({filteredQuestions.length})</span></h2>

            <div className="mt-4">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(q => (
                        <div key={q.id} className="flex items-center p-2 bg-[#FFF7F1] rounded-xl mb-3">
                            <div className="w-[10%] flex justify-center">
                                <FaUserCircle className="text-4xl text-gray-500" />
                            </div>
                            <div className="w-[90%]">
                                <p className="text-lg font-semibold">{q.user}</p>
                                <p className="text-gray-700">{q.question}</p>
                                <p className="text-sm text-gray-500">{q.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No questions found.</p>
                )}
            </div>
        </div>
    );
};

export default QAA;
