import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {CityResponse, EventResponse, ObjectContext} from "../helpers/interfaces";
import './Home.css';
import {useOutletContext} from "react-router-dom";
import ApiService from "../services/ApiService";
import {datePipe} from "../helpers/dateHelpers";
export default function Home() {

    const objectContext: ObjectContext = useOutletContext();
    const apiService: ApiService = new ApiService();
    const [events, setEvents] = useState<EventResponse[]>();
    const [cities, setCities] = useState<CityResponse[]>();
/*    const [newPostContent, setNewPostContent] = useState<string>('');
    const [recommendations, setRecommendations] = useState<User[]>([]);*/

   axios.defaults.headers.common['Authorization'] = "Bearer " + (objectContext.loggedUser.jwt_token.length > 0 ? objectContext.loggedUser.jwt_token : '');

    const getAllCities = () => {
        apiService.getAllCities()
            .then(
                (response: AxiosResponse<CityResponse[]>) => {
                    setCities(response.data);
                }
            )
            .catch((error) => console.error('An error has occurred:', error))
    }

    const getAllEvents = () => {
        apiService.getAllEvents()
            .then(
                (response: AxiosResponse<EventResponse[]>) => setEvents(response.data)
            )
            .catch((error) => console.error('An error has occurred:', error))
    }

    /*const deletePost = (id: number) => {
        axios.post(`${REACT_APP_API_URL}/post/delete`, {
            post_id: id
        }).then(
            (response: AxiosResponse<any>) => {
                if(response.status === 200) {
                    getLatestPosts();
                }
            }
        )
            .catch((error) => {
                console.error('An error has occurred during deleting the post:', error);
            })
    }*/

    useEffect(() => {
        getAllCities();
        getAllEvents();
    }, []);

    return (
        <div className="HomeContainer">
            <h2>Our events:</h2>
            <div className="ListContainer">
                <ul>
                    {
                        events?.map(
                            (event: EventResponse) => {
                                return (<li key={event._id}>
                                            {event.name} {event.description} {datePipe(event.date)}
                                        </li>);
                            }
                        )
                    }
                </ul>
            </div>
            <h2>You can find us in:</h2>
            <div className="ListContainer">
                <ul>
                    {
                        cities?.map(
                            (city: CityResponse) => {
                                return <li key={city._id}>{city.name}</li>
                            }
                        )
                    }
                </ul>
            </div>
            {/*{objectContext.loggedUser.jwt_token.length > 0 &&
                <div className="NewPostContainer">
                    <form className="NewPostForm" onSubmit={(event: FormEvent<HTMLFormElement>) => addNewPost(event)}>
                        <textarea rows={3}
                                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                                  value={newPostContent}
                                  className="NewPostTextarea"
                                  placeholder="Write new post"/>
                        <button className="Button PrimaryButton">Add</button>
                    </form>
                </div>
            }*/}
            {/*{objectContext.loggedUser.jwt_token.length > 0 &&
                <Recommendations recommendations={recommendations} followUser={(id) => followUser(id)} />
            }
            <div className="PostList">
                <h2>Posts</h2>
                {posts.map(
                    (post: Post) => {
                        return <PostElement post={post} key={post.id}
                                            deletePost={(id) => deletePost(id)}
                                            likePost={(id) => likePost(id)}
                                            dislikePost={(id) => dislikePost(id)}
                                            unfollow={(id) => unfollowUser(id)}
                        />
                    }
                )}
            </div>
            <button className="Button PrimaryButton LoadMoreButton" onClick={getOlderPosts}>Load more</button>*/}
        </div>
    );
}
