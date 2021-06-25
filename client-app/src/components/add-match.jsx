import React, {useState} from "react";
import {Button} from "@material-ui/core";
import Api from '../generics-services/api'
import {useHistory} from 'react-router-dom'


export default function AddMatch() {
    let allteams = ['Karachi Kings', 'Lahore Qalanders', 'Multan Sultan', 'Queta Galdiators', 'Islamabad United', 'Peshawar Zalmi'];
    const [teams] = useState(allteams);
    const [teamA, setTeamA] = useState('Karachi Kings');
    const [teamB, setTeamB] = useState('Lahore Qalanders');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    let history = useHistory();

    function addMatch(e) {
        e.preventDefault();
        e.preventDefault();
        if(city === '' || date === '' || teamA === '' || teamB === '') {
            alert('please fill all fields');
            return;
        }
        Api.execute('/match', 'post', {
            city: city,
            date: date,
            teamA: teamA,
            teamB: teamB
        }).then(() => {
            history.push('/');
        }).catch((err) => {
            alert('Login again')
            history.push('/')
            console.log(err);
        })
    }


    return(
        <div className="mt-10">
            <form className="w-full max-w-lg mx-auto">
                <h1 className="text-xl font-bold my-5">Add match</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-first-name">
                            City
                        </label>
                        <input
                            value={city}
                            onChange={event => setCity(event.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name" type="text" placeholder="City"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-last-name">
                            Date
                        </label>
                        <input
                            value={date}
                            onChange={event => setDate(event.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name" type="date" placeholder="Date"/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            Team A
                        </label>
                        <div className="relative">
                            <select
                                value={teamA}
                                onChange={event => setTeamA(event.target.value)}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state">
                                {
                                    teams && teams.map(team => (
                                        team !== teamB && <option key={team}>{team}</option>
                                    ))
                                }
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                               htmlFor="grid-state">
                            Team B
                        </label>
                        <div className="relative">
                            <select
                                value={teamB}
                                onChange={event => setTeamB(event.target.value)}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state">
                                {
                                    teams && teams.map(team => (
                                        team != teamA && <option key={team}>{team}</option>
                                    ))
                                }
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="my-6 w-full mx-3">
                        <Button onClick={addMatch}  variant="contained" color="primary" type="submit"
                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Match
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
