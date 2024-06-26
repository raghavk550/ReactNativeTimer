import React, { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext";
import { View, TouchableOpacity, Text } from "react-native";
import axios from "axios";

const ContextTest = () => {
    const { myColor, setColor, toggleColor } = useContext(MyContext);
    const [apiData, setApiData] = useState(null);

    const changeColor = (() => {
        // setColor("gray")
        toggleColor()
    })

    useEffect(() => {
        const endpoint = 'https://api.freeapi.app/api/v1/public/randomusers';
        const params = {
            page: '1',
            limit: '10'
        };
        const fetchData = async () => {
            try {
                // const response = await fetch(`${endpoint}?${new URLSearchParams(params).toString()}`);
                // const res = await response.json();
                const res = await axios.get(`${endpoint}?${new URLSearchParams(params).toString()}`)
                // console.log('res', res.data.data.data[0].name);
                // const dataModel = new DataModel(res.data.data.data, res.data.data.nextPage)
                // console.log(res.data.data.data[0])
                if (res.data) {
                    setApiData(res.data);
                }

            } catch (err) {
                console.log("ERR", err);
            }
        }
        fetchData();
    }, [])

    return (
        <View style={{ backgroundColor: myColor, flex: 1, marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={changeColor}>
                <Text>Change Color</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ContextTest;

class DataModel {
    nextPage: boolean
    data: DataArrayModel[]
    constructor(data: [DataArrayModel], nextPage: boolean) {
        this.data = data.map(dataModel => new DataArrayModel(dataModel.name, dataModel.email, dataModel.picture));
        this.nextPage = nextPage;
    }
}

class DataArrayModel {
    email: String;
    name: NameModel;
    picture: PictureModel
    constructor(name: NameModel, email: String, picture: PictureModel) {
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
}

class NameModel {
    first: String; last: String; title: String;
    constructor(first: String, last: String, title: String) {
        this.first = first;
        this.last = last;
        this.title = title;
    }
}

class PictureModel {
    large: String; medium: String;
    constructor(large: String, medium: String) {
        this.large = large;
        this.medium = medium;
    }
}