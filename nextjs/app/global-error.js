'use client'

export default function GlobalError({
    error,
    reset
})
{
    return (
        <html>
            <body>
                <h2>Something went wrong</h2>
                <button onClick={() => reset()}>Reset</button>
            </body>
        </html>
    )
}
