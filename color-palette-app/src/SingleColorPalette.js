import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        };
        this.changeFormat = this.changeFormat.bind(this);
    }

    // return all shades of the colorToFilterBy from the palette
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let level in allColors) {
            shades = shades.concat(
                allColors[level].filter(color => color.id === colorToFilterBy)
            )
        }

        // return the shades excluding the level 50, which is white
        return shades.slice(1);
    }

    // change the format of the color text when copied
    changeFormat(val) {
        this.setState({format: val});
    }

    render() {
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const colorBoxes = this._shades.map(color => (
           <ColorBox
               key={color.name}
               name={color.name}
               background={color[format]}
               showLink={false}
           />
        ));
        return (
            <div className={"SingleColorPalette Palette"}>
                <Navbar handleChange={this.changeFormat} showLevelsBar={false}/>
                <div className={"Palette-colors"}>
                    {colorBoxes}
                    <div className={"go-back ColorBox"}>
                        <Link to={`/palette/${id}`} className={"back-button"}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default SingleColorPalette;