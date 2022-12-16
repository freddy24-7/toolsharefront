import classes from './StartingPageContent.module.css';
import workman from '../../assets/pexels-photo-1453499.jpeg'
import mapfragment from '../../assets/data=q8Yb3i1ZJDgME8lObg6m8S37Tina54xfIBd3D8q6TYqFxJVKcuxcl65TU9BlFfCnIlds9WLCt4DD0mYMnStbOwjdslmpL0q3zK5e8Z5PMGNdlVUZfua6I3EkTdeo298Zxbgucw5IeBxf-aG6PwtGnY2ebwSVyArd7pvgM3VWSjkBKFyx8jFCIgmBr4I_IjsqZHhgNzAvQYdVJplgICfFgSzqfM6CpId2WsLv6GPHbWP.png'


//Application starting page
const StartingPageContent = () => {
    return (
        <>
            <div className={classes.starting}>
                    <h1 className="starting h1">Spullen lenen op fiets afstand & geld sparen </h1>
                <h3>Een milieuvriendelijk initiatief om nuttige dingen met elkaar te delen in Utrecht Terwijde (postcode 3543)</h3>
            </div>
            <div className={classes.mapDetails}>
                <img src={mapfragment} alt="mapfragment" height={300} width={400}/>
            </div>
            <div className={classes.photo}>
                <img src={workman} alt="workman" height={500} width={500}/>
            </div>

        </>


    );
};

export default StartingPageContent;