import Withloadable from '../utils/Withloadable';

let routes=[
    {
        path:'/home',
        component:Withloadable(()=>import ('../view/home/Home')),
        children:[
            {
                path:'/home/teacherIndex',
                component:Withloadable(()=>import('../view/home/teacherIndex/TeacherIndex'))
            },
            {
                path:'/home/studentIndex',
                component:Withloadable(()=>import('../view/home/studentIndex/StudentIndex'))
            },
            {
                path:'/home/personSet',
                component:Withloadable(()=>import('../view/home/personSet/Personset'))
            },
            {
                path:'/home/studentManger',
                component:Withloadable(()=>import('../view/home/studentManger/StudentManger'))
            },
            {
                path:'/home/scoreManger',
                component:Withloadable(()=>import('../view/home/scoreManger/ScoreManger'))
            }
        ]
    },
    {
        path:'/login',
        component:Withloadable(()=>import ('../view/login/Login'))
    },
    {
        path:'/registry',
        component:Withloadable(()=>import ('../view/registry/Registry'))
    },
    {
        path:'/Notfind',
        component:Withloadable(()=>import ('../view/Notfind'))
    },
    {
        path:'/',
        redirect:'/home'
    }
]

export default routes;