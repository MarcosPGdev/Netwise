import './header.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobalState';

function Header(){
    const { selectedRoute, setSelectedRoute, homeContent, setHomeContent } = useGlobalState();

    const navigate = useNavigate();

    useEffect(() =>{
        navigate(selectedRoute, { state: { homeContent } });
    }, [selectedRoute, homeContent]);

    return(
        <header className="header">
            <div className={`headerSelector ${homeContent === 'posts' ? 'headerSelectorSelected' : ''}`} onClick={() =>{ setSelectedRoute('/home'); setHomeContent('posts')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28.882" height="29.023" viewBox="0 0 28.882 29.023">
                    <path id="Trazado_40" data-name="Trazado 40" d="M29.882,12.153,15.941,1,2,12.153v2.788H4.788V28.882h6.971V23.306a4.182,4.182,0,1,1,8.365,0v5.576h6.971V14.941h2.788Z" transform="translate(-1.5 -0.36)" fill="#fff" stroke="#fff"/>
                </svg>
            </div>
            <div className={`headerSelector ${homeContent === 'projects' ? 'headerSelectorSelected' : ''}`} onClick={() =>{ setSelectedRoute('/home'); setHomeContent('projects')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29.352" height="27.244" viewBox="0 0 29.352 27.244">
                    <path id="Trazado_50" data-name="Trazado 50" d="M11.29,10.833,14.234,7.34a5.377,5.377,0,0,1,5.044-2.055l3.9.677,5.4-3.831a.419.419,0,0,1,.518.014.752.752,0,0,1,.256.591V15.767A3.087,3.087,0,0,1,28.476,18l-3.64,3.414-3.942-4.335a5.359,5.359,0,0,0,2.025-1.733,2.118,2.118,0,0,0-.032-2.433,1.105,1.105,0,0,0-1.854.043,2.46,2.46,0,0,1-1.367,1.007,2.821,2.821,0,0,1-1.78-.2l-.935-1.031-2.61,2.775A1.984,1.984,0,0,1,11.1,15.1a3.8,3.8,0,0,1,.192-4.266M9.533,8.281l2.113-2.506A5.008,5.008,0,0,0,8.858,5.6l-3.847.875L.788,3.495A.427.427,0,0,0,.26,3.51a.767.767,0,0,0-.26.6V15.765a3.129,3.129,0,0,0,.935,2.321L12.372,28.315a3.472,3.472,0,0,0,4.893-.063l5.254-4.893-5.6-6.161-.933.985c-2.093,2.206-5.143,1.833-6.888-.843a8.028,8.028,0,0,1,.431-9.058Z" transform="translate(0 -2.048)" fill="#fff"/>
                </svg>
            </div>
            <div className={`headerSelector ${homeContent === 'communities' ? 'headerSelectorSelected' : ''}`} onClick={() =>{ setSelectedRoute('/home'); setHomeContent('communities')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29.352" height="29.352" viewBox="0 0 29.352 29.352">
                    <path id="Trazado_49" data-name="Trazado 49" d="M12.741,5.4A4.4,4.4,0,1,1,8.338,1a4.4,4.4,0,0,1,4.4,4.4m2.935,13.208a4.4,4.4,0,1,0-4.4-4.4,4.4,4.4,0,0,0,4.4,4.4m-7.191-5.87H3.935A2.935,2.935,0,0,0,1,15.676v.608a5.114,5.114,0,0,0,2.339,4.13,8.02,8.02,0,0,0,2.794,1.233,5.875,5.875,0,0,1,3.792-2.879,7.309,7.309,0,0,1-1.441-6.026m12.944,6.026a5.87,5.87,0,0,1,3.789,2.876,7.962,7.962,0,0,0,2.794-1.23,5.109,5.109,0,0,0,2.339-4.13v-.608a2.935,2.935,0,0,0-2.935-2.935h-4.55a7.367,7.367,0,0,1-1.438,6.026m-10.156,2.78a2.935,2.935,0,0,0-2.935,2.935v.49a4.866,4.866,0,0,0,2.372,3.986,8.989,8.989,0,0,0,4.966,1.394,9.013,9.013,0,0,0,4.966-1.394,4.873,4.873,0,0,0,2.372-3.986v-.49a2.935,2.935,0,0,0-2.935-2.935ZM24.481,9.806a4.4,4.4,0,1,0-4.4-4.4,4.4,4.4,0,0,0,4.4,4.4" transform="translate(-1 -1)" fill="#fff"/>
                </svg>
            </div>
            <div className={`headerSelector ${homeContent === 'netwisers' ? 'headerSelectorSelected' : ''}`} onClick={() =>{ setSelectedRoute('/home'); setHomeContent('netwisers')}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25.942" height="25.942" viewBox="0 0 25.942 25.942">
                    <path id="Trazado_52" data-name="Trazado 52" d="M26.645,2H7.188A2.594,2.594,0,0,0,4.594,4.594V8.485H2V11.08H4.594v2.594H2v2.594H4.594v2.594H2v2.594H4.594v3.891a2.594,2.594,0,0,0,2.594,2.594H26.645a1.3,1.3,0,0,0,1.3-1.3V3.3a1.3,1.3,0,0,0-1.3-1.3M16.268,5.89a3.892,3.892,0,1,1-3.891,3.891A3.905,3.905,0,0,1,16.268,5.89m7.783,16.864H8.485v-.973c0-2.878,3.509-5.837,7.783-5.837s7.783,2.959,7.783,5.837Z" transform="translate(-2 -2)" fill="#fff"/>
                </svg>
            </div>
            <div className={`headerSelector ${selectedRoute === '/profile' ? 'headerSelectorSelected' : ''}`} onClick={() =>{ setSelectedRoute('/profile'); setHomeContent(null)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28.5" height="28.5" viewBox="0 0 28.5 28.5">
                    <path id="Trazado_55" data-name="Trazado 55" d="M10.917,9.333a6.333,6.333,0,1,1,6.333,6.333,6.333,6.333,0,0,1-6.333-6.333m0,9.5A7.917,7.917,0,0,0,3,26.75,4.75,4.75,0,0,0,7.75,31.5h19a4.75,4.75,0,0,0,4.75-4.75,7.917,7.917,0,0,0-7.917-7.917Z" transform="translate(-3 -3)" fill="#fff"/>
                </svg>
            </div>
        </header>
    )
}


export default Header;