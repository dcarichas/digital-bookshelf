import React from "react";

const loadingStyles = {
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
};

export const Loading: React.FC = () => {
    return(
        <div style={loadingStyles.loadingContainer}>
            <div style={loadingStyles.spinner}></div>
            <p>Loading...</p>
        </div>
    )
}