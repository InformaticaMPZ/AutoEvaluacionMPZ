import React from 'react'
import './loader.css'
function Loader() {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className='min-h-screen flex items-center justify-center'>
                <div className="fixed inset-0 ">
                    <div className="absolute inset-0 bg-gray-300 opacity-60"></div>
                </div>
                <div className="🤚">
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="🌴"></div>
                    <div className="👍"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader