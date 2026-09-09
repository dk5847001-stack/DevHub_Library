export default function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}){
    return(
        <div className="flex mt-32 justify-around w-full">
            <div>
                <img src={imageURL} />
            </div>
            <div className="w-1/3 pt-8">
                <h1 className="text-3xl mb-3 font-semibold">{productName}</h1>
                <p className="text-gray-600">{productDescription}</p>
                <div className="flex gap-8">
                <a className="text-blue-600 text-sm" href={tryDemo}>Try Demo →</a>
                <a className="text-blue-600 text-sm" href={learnMore}>Learn More →</a>
                </div>
                <div className="flex gap-8 mt-3">
                <a href={googlePlay}><img src="/media/images/googlePlayBadge.svg" /></a>
                <a href={appStore}><img src="/media/images/appstoreBadge.svg" /></a>
                </div>
            </div>
        </div>
    )
}