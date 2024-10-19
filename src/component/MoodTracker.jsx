import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Mood.css";

const MoodTracker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [currentMood, setCurrentMood] = useState("😂");
    const [isOpen, setIsOpen] = useState(false);

    const moods = [
        {
            id: 1,
            name: "Happy",
            emoji: "😂",
        },
        {
            id: 2,
            name: "Sad",
            emoji: "😢",
        },
        {
            id: 3,
            name: "Blush",
            emoji: "😊",
        },
        {
            id: 4,
            name: "Sarcastic",
            emoji: "🙃",
        },
    ];

    const [moodHistory, setMoodHistory] = useState(() => {
        const storedHistory = localStorage.getItem("moodHistory");
        return storedHistory ? JSON.parse(storedHistory) : {};
    });

    useEffect(() => {
        localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    }, [moodHistory]);

    const handleMoodSelect = (emoji) => {
        setCurrentMood(emoji);
        const dateKey = startDate.toDateString();
        setMoodHistory((prev) => ({
            ...prev,
            [dateKey]: emoji,
        }));
    };

    const removeLogs = () => {
        localStorage.removeItem("moodHistory");
        setMoodHistory({});
    };

    const handleCalendarOpen = () => {
        setIsOpen(true);
    };

    const handleCalendarClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="mood-tracker-container m-20 min-h-[30rem] max-h-[80vh] w-[30rem] shadow-lg shadow-slate-500 rounded-xl flex flex-col justify-between p-6 relative bg-[#091057] font-mono">
            {/* Subtle white gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/10 rounded-xl pointer-events-none"></div>
            <h2 className="text-white font-mono text-[2.5rem] text-center mb-4">
                Mood Tracker
            </h2>

            {/* Date Picker */}
            <div className="flex justify-center items-center font-mono gap-3 pt-2">
                <h4 className="text-gray-300 text-[1.2rem] font-semibold">Select Date:</h4>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="custom-datepicker-input bg-[#1f1f2e] text-white rounded-md px-3 py-2 border border-gray-700"
                    calendarClassName={`custom-calendar ${isOpen ? "open" : "closed"}`}
                    dayClassName={() => "custom-day"}
                    popperPlacement="bottom-start"
                    onCalendarOpen={handleCalendarOpen}
                    onCalendarClose={handleCalendarClose}
                />
            </div>

            {/* Mood Selector */}
            <div className="pl-6 pt-3">
                <h4 className="text-gray-400 text-[16px] font-semibold mb-2">Select Your Mood:</h4>
                <div className="mood-options flex gap-8">
                    {moods.map((mood) => (
                        <button
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood.emoji)}
                            className={`emoji-btn ${currentMood === mood.emoji ? "selected" : ""
                                }`}
                        >
                            {mood.emoji}
                        </button>
                    ))}
                </div>
            </div>

            {/* Display Current Mood */}
            <div className="pt-6 text-center">
                <h4 className="text-gray-400">Current Mood for {startDate.toDateString()}:</h4>
                <p className="text-white text-[24px]">{moodHistory[startDate.toDateString()] || currentMood}</p>
            </div>

            {/* Mood History */}
            <div className="mt-6 z-10 overflow-auto max-h-[10rem] mood-history-list">
                <div className="flex justify-between items-center">
                    <h4 className="text-gray-400">Mood History:</h4>
                    <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={removeLogs}
                    >
                        ❌ Clear History
                    </button>
                </div>

                <ul className="mt-3 text-white list-none">
                    {Object.entries(moodHistory).map(([date, mood]) => (
                        <li key={date} className="flex justify-between">
                            <span>{date}</span>
                            <span className="text-[20px]">{mood}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MoodTracker;
