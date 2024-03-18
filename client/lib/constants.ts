import NavbarItem from "@/app/_components/_navbar/types/navbarItem.interface";
import { CourseCardProps } from "@/app/featured/_components/CourseCard";
import Faq from "@/types/faq.interface";
import { alexanderHipp, brookeCagle, dataScience, docker, webDev } from "./assets";
import { InstructorCardProps } from "@/app/featured/_components/InstructorCard";


export const navbarItems: NavbarItem[] = [
    {
        title: 'Home',
        link: '/',
        active: false
    },
    {
        title: 'Featured',
        link: '/featured',
        active: false
    },
    {
        title: 'About',
        link: '/about',
        active: false
    },
    {
        title: 'FAQ',
        link: '/faq',
        active: false
    },
    {
        title: 'Contact Us',
        link: '/contact',
        active: false
    }
];

export const faqs: Faq[] = [
    {
        id: 1,
        question: 'Will I receive a certificate upon completing a course?',
        answer: 'Yes, upon successful completion of a course, you will typically receive a certificate of completion. This certificate serves as proof of your participation and achievement in the course and may be useful for professional development, job applications, or academic purposes.'
    },
    {
        id: 2,
        question: 'Can I download course videos for offline viewing?',
        answer: 'No, downloading course videos for offline viewing is not currently supported. Our platform is designed to provide access to course materials primarily through online streaming to ensure content security and compliance with copyright regulations. '
    },
    {
        id: 3,
        question: 'Can I ask questions to instructors?',
        answer: 'Yes, you can ask questions to instructors directly through the platform. Most courses have discussion forums or messaging features where you can post your questions.'
    },
    {
        id: 4,
        question: 'Can I access the learning materials offline?',
        answer: 'Currently, our system primarily operates online. However, you may be able to download certain materials for offline viewing. Please check with your course instructor or administrator for more information.'
    }
]

export const courseCards: CourseCardProps[] = [
    {
        title: 'Data Science Fundamentals',
        image: dataScience,
        rating: 4.2,
        reviews: 1088,
        price: 9.99,
        estimatedPrice: 89.99,
        noOfLectures: 12
    },
    {
        title: 'Introduction to Docker',
        image: docker,
        rating: 4.6,
        reviews: 2367,
        price: 19.99,
        estimatedPrice: 99.99,
        noOfLectures: 17
    },
    {
        title: 'Web Development Boot Camp',
        image: webDev,
        rating: 4.4,
        reviews: 3426,
        price: 6.99,
        estimatedPrice: 69.99,
        noOfLectures: 21
    }
]

export const instructors: InstructorCardProps[] = [
    {
        name: 'Alexander Hipp',
        picture: alexanderHipp, 
        position: 'Head Data Scientist',
        rating: 4.7,
        reviews: 4672,
        courses: 13,
        students: 7833
    },
    {
        name: 'Brooke Cagle',
        picture: brookeCagle, 
        position: 'Head System Architect',
        rating: 4.5,
        reviews: 3269,
        courses: 8,
        students: 5744
    }
]