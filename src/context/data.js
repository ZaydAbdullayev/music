import calm1 from "../assets/calm.mp3";
import calm2 from "../assets/calm1.mp3";
import energetic1 from "../assets/energetic.mp3";
import energetic2 from "../assets/energetic1.mp3";
import sad1 from "../assets/sad.mp3";
import sad2 from "../assets/sad1.mp3";
import focused1 from "../assets/focused.mp3";
import focused2 from "../assets/focused1.mp3";
import dreamy1 from "../assets/dreamy.mp3";
import dreamy2 from "../assets/dreamy1.mp3";

export const moods = {
    calm: {
        name: "Calm Station",
        gradient: "linear-gradient(to bottom right, #319795, #222731)",
        color: "#38b2ac",
        quote: "Drift with the tide, peacefully.",
        tracks: [calm1, calm2],
    },
    energetic: {
        name: "Energetic Pulse",
        gradient: "linear-gradient(to bottom right, #dd6b20, #222731)",
        color: "#f6ad55",
        quote: "Light up the world with your fire.",
        tracks: [energetic1, energetic2],
    },
    sad: {
        name: "Melancholy Echo",
        gradient: "linear-gradient(to bottom right, #2b6cb0, #222731)",
        color: "#63b3ed",
        quote: "It’s okay to slow down and feel.",
        tracks: [sad1, sad2],
    },
    focused: {
        name: "Deep Focus",
        gradient: "linear-gradient(to bottom right, #2f855a, #222731)",
        color: "#48bb78",
        quote: "Find power in the silence.",
        tracks: [focused1, focused2],
    },
    dreamy: {
        name: "Dreamscape",
        gradient: "linear-gradient(to bottom right, #805ad5, #222731)",
        color: "#9f7aea",
        quote: "Let your thoughts wander in the clouds.",
        tracks: [dreamy1, dreamy2],
    },
};
