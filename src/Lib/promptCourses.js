import Inquirer from 'inquirer'

export const promptStoredCourses = async storedCourses => {
    const choices = Object.keys(storedCourses).filter(courseName => {
        const course = storedCourses[courseName]
        const videos = course.videos.filter(video => !video.downloaded)
        return videos.length > 0
    })
    .sort((titleA, titleB) => {
        titleA = titleA.replace(/[^a-z0-9 ]/gi, '').toLowerCase()
        titleB = titleB.replace(/[^a-z0-9 ]/gi, '').toLowerCase()
        if (titleA < titleB) return -1
        if (titleA > titleB) return 1
        return 0
    })
    const { selectedCourses } = await Inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Select Courses',
            name: 'selectedCourses',
            choices,
        },
    ])
    return selectedCourses
}

export const promptCoursesForExtraction = async (
    coursesList,
    storedCourses = {},
) => {
    const _coursesList = [...coursesList].sort((a, b) => {
        let titleA = a.title
        let titleB = b.title
        titleA = titleA.replace(/[^a-z0-9 ]/gi, '').toLowerCase()
        titleB = titleB.replace(/[^a-z0-9 ]/gi, '').toLowerCase()
        if (titleA < titleB) return -1
        if (titleA > titleB) return 1
        return 0
    })
    const choices = _coursesList.map(course => ({
        name: storedCourses[course.title]
            ? course.title + ' (Extracted once) '
            : course.title
    }))
    const { selectedCourses } = await Inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Select Courses',
            name: 'selectedCourses',
            choices,
        },
    ])
    return coursesList.filter(
        course => selectedCourses.indexOf(course.title) >= 0,
    )
}
