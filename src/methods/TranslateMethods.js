export function getModelById(id) {
    const models = {
        "-1": "",
        "0": "Художественная",
        "1": "Реалистичная",
        "2": "спец.1",
        "3": "спец.2"
    };

    return models[id] || "";
}

export function getSizeById(id) {
    const sizes = {
        "-1": "0",
        "0": "512x512",
        "1": "768x512",
        "2": "512x768",
        "3": "1024x1024",
        "4": "1536x1024",
        "5": "1024x1536"
    };

    return sizes[id] || "0";
}

export function getStrengthById(id) {
    const strengths = {
        "-1": "",
        "0": "10%",
        "1": "25%",
        "2": "50%",
        "3": "75%",
        "4": "100%"
    };

    return strengths[id] || "";
}

export function getSchedulerById(id) {
    const schedulers = {
        "-1": "",
        "0": "Стандартный",
        "1": "Модифицированный",
        "2": "Художественный",
        "3": "Специальный"
    };

    return schedulers[id] || "";
}

export function getStepsById(id) {
    const steps = {
        "-1": "",
        "0": "20",
        "1": "30",
        "2": "40",
        "3": "50"
    };

    return steps[id] || "";
}
