export default function Education(){
    return(
        <div>
            <section className="w-full flex justify-around">
            <div>
                <img src="/media/images/education.svg" />
            </div>

            <div className="flex w-1/2 flex-col justify-center">
            <h1 className="text-4xl text-gray-700 font-semibold">Free and open market education</h1>
            <p className="text-gray-600">Varsity, the largest online stock market education book in the worlswise thinking from the basics to advanced trading.</p>
            <a className="text-blue-800 hover:text-blue-700" href="/google.com">Verify →</a><br/>
            <p className="text-gray-600">TrandingQ&A, the most active trading and investmer market related quiries.</p>
            <a className="text-blue-800 hover:text-blue-700" href="/google.com">TrandingQ&A →</a><br/>
            
            </div>
            </section>
        </div>
    )
}