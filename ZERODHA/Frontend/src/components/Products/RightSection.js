export default function RightSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}){
    return(
        <div className="flex mt-16 justify-around w-full">
            <div className="w-1/3 pt-32">
                <h1 className="text-3xl mb-3 font-semibold">{productName}</h1>
                <p className="text-gray-600">{productDescription}</p>
                <a className="text-blue-600 text-sm" href={learnMore}>Learn More →</a>
            </div>

            <div>
                <img src={imageURL} />
            </div>
        </div>
    )
}