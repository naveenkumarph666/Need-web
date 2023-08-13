import { AppBar, Box, Button, ButtonBase, Grid, Paper, TextField, ThemeProvider, Toolbar, Typography, createTheme, styled } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardSkeleton from "./CardSkeleton";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CartSkeleton from "./CartSkeleton";
import { useNavigate } from "react-router-dom";
function ViewCart() {
  const [val, setVal] = useState();
  const [total, setTotal] = useState();
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([])
  const ORDERS_URL = 'http://localhost:4000/Orders';
  const CARTS_URL = 'http://localhost:4000/Carts';
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name === '' || name === null) {
      navigate('/');
    }
    else {
    setTimeout(() => {
      loadItems();
    }, 1000)
  }
  }, [])
  const logoutDashboard = () => {
    localStorage.removeItem('username');
    navigate('/');
  }
  const loadItems=()=>{
    axios.get(CARTS_URL).then(res => setData1(res.data));
    var totalPrice = 0;
    axios.get("http://localhost:4000/Carts").then(res => {
        setData(res.data)
        setIsLoading(false)
        {
          res.data.map(data => {
            totalPrice += data.Quantity * data.Price
          })
          setTotal(totalPrice)
        }
      })
  }
  const loadScript=(src)=>{
    return new Promise((resovle)=>{
      const script = document.createElement('script')
      script.src = src 

      script.onload = () =>{
        resovle(true)
      }
      script.onerror=()=>{
        resovle(false)
      }
      document.body.appendChild(script)
    })
  }
  const sendOrder = async (total) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res)
    {
      alert('You are offline... failed to load Razorpay SDK')
      return
    }
    const options = {
      key:"rzp_test_UyrBj1whNSoykF",
      currency:"INR",
      amount:total*100,
      name:'shop with need',
      description:'Thanks for purchasing',
      image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVEhgRERUYGBgYGBEYGBgYEhgYGBgYGBkZGhkYGhgcIS4lHB4rHxgYJjomKy80NTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHjQrISw0NDQ0NDQ0NDQ0MTcxNDY6NDExNDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDY0NDQ0NDQxNDQxNP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAAAQIDBAUGBwj/xABEEAACAQIEAggDBgQEAwkBAAABAgADEQQSITEFQQYTIlFhcYGRMlKhFEKSscHRBxVi8COCouEzcvEkU1Rjk7LC0uIW/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACsRAAICAQMDAwMEAwAAAAAAAAABAhEDEiExBEFRBWGhEyKBFDJxkVLR8P/aAAwDAQACEQMRAD8A9ZkjCS7JHlns6jgopywyy/LFli1BRTlhll+WLLDUFFOWLLL8sWSPUFFBSIpL8kRWCkFFBWIrLysRWVqFRQViKy7LIlY0xNFBWRKy4rEVlJiooKyJWXlZArKUiaKCsgVmgrIlZSkTRQVkCs0FZArKTCigrIlZeViKylIRmKyJWaCsgyykxUZmWQZIYvG0qfxuAe4at+Eazz2N6TrtST1bX6DT6nyhrSEoNndcW1Og5nlOXi+L0U+9mP8ATt+I6e155jF8Rq1Pjcnw5DyGw9BMZ7/11hcnxsWsS7s7GL4/UbROyPDf8R19gJyKlVm1Yn3/ALJ9ZCOS4J/u3NYpR4RAiKMiEGhkIRwhQz9D5I8suyQyTy9RdFOWPLLssMsLCinLFll+WK0LCikrEVlxWIrHYUUlZErLssRWOwopKyJWX5ZErHYqKCsRWXlZArKTFRQVkGWaCsiyylITRnKyJWXlZArKTJaKSsgVlxWIrLTE0UFYisuKzk4/j2GpfE4Y9yWb0zXsD4XvHZNG4rKazqgzOwUd7EAfWeQ4h0xqNcUVCD5j2m9yLD29Z5zE42pUOZ2Zj4sfz3+s1jGT7Co9rj+k9BLhLufwj9/p6zzeO6R16mgbIO5ez+Rv9beE40LTVYvLHsgZydzf++6IxxS1FLgLIxERwg0NEYpIiKIojAiOKS0ArRwtCIZ+kcsMsuywyzw9R0UU5YZZdliyx6goqyxZZdliywsKKSsRWW5YisdioqKyNpcVkcspMVFJWRKy8rEVjsVGcrFaX2kSsakKigrIFZeVldQhQWYgAakkgAeZO0tSFRSViKzh8U6X4Sl2VY1G7k+H1Y8vEAzyHEumeKqXFO1Jf6fi9W3v4i3lNYQnLhENpHv8bjaVIXquqeBPaPko1PtPK8R6bItxh1zH5n288oOvuPKeHq1GYlnYsTqSTe57/OQnVDp/8mZuR0uIcexNbR3OX5RovsND6i85hNzc/WEJ0RhGPCFYoWjilgERjhaAChAwgAojHCIZGIxwMljIxRmERRGEcIqA/TeWGWTywyz52zrohliyywrC0LFRVaK0ttFaOwKisiVl1oiI7AqtIlZcVkSsdiopIiKx4isiLnd1RR95mCj3M8nxXp9had1pBqza/D2U/EdT7esuEZSdRVkylGPJ6krObxPjOGw4/wAaoqkfdBu34Rt6z5pxbprjK91V+rQ/dTQ+rbnyvaebYkm7Ek+M7sfRTe8nRjLKux7ziv8AELdcNT/zvqfRRoPczx3EeL4iu2atUZuYF7KPIDQekxGFp2w6aEOEZObfIopK0RE3okUYH9jU+0JFzobdxilwNcnb450bxGEppVxAQB2yBVfMytlLWYWtsDsTtOKZ9F/izWDUcNb71R39An/7HvPOdD+jD4x8z3Wgh7b7FjvkQ9/eeQ8bTyOj9RcunebPSptbez4OvLgX1FGB52Kek6e4HCYfEpTwhAOQmogcvkYEZbkkkFhc28Aec81eeh03UR6jGskbp+TCeNwdMIQhOkgIoWjkgKKOKAyMJKIxAKRMlERJaKFCEIhn6hywtLLRWnzNnaV2gRLLRWhYFdoisstK61VUUu7BVG5YgAepjsQiIss8nxj+IODo3WkTWcck0W/i5/SeC4x03xuIuofq0P3aelx4tuZ1Yukyz3ql7mMs0Y8H1Li3SPCYe/XVVzfIvac+GUbHztPC8Y/iRUa64WmEHzv2m8wuw9bzwLNc3Op7zqfeKeji6CEd5bmEszfsasfxGtXbNWqM5/qYkDwA5CZI4ATujBRVIxsUI7QtKAjHLsPhqlRstNHdvlRGZvZQTNnD+CYitiRhFUpVObs1QyZbKWJYEXGg7pEpxjdvjcpRb4RkweFerUSkgu7sqqCQAWY2Gp2mjjfCamErfZ65QvkV+wSy2a9hcga9kz2WA6HthHw+Ir1B1n2vD01praxU1QuYk6m47QFhoReav4qV8CoZMoONdcOVbIxK0xUv8Z7KgqHGmp5zgl115YxhvHvsbxw/a3LZnK6CcGwOJp1BiSrVS+VE6wq6oFUh0AIuSxIvr8Pib4Ol/Q58GprI4qUbqvastRCxsAQNGFzuLb7c55TJff8Aszp16ONfCCpUNZ8MjrlZ3YoHPZXKGNyLm1wLAm28xy4uohn+osi0t00+PwXGUJQpx3XdBxXjVTFGgMRbJRUIAi2YqcgdiSTdiEFtgDPR8e6bqtMYPhSmnTUBetKlSF5imrahtdXbW9/OeMphbgE5RcAm18oPOw3tvafRqn8PcNVpipg8UxDAZWYJURvG6ZbfW0x63D0eJwWW0rbSW6bfkvFLJJNx5+T5mKe5JJJJJJNySdySdzJWnY6RcBrYJ0SsUOcOUZGJBCEA3BAIPaHvvOTPX6eeOeNPG049qObIpKVS5FFHFNyAiMcRgAQhCSApGShAZGElEYgIwjhJoqz9S2itJ2hafK2ehRC0CJK0LR2KiFp8C6V4+tUxddKlR2VK2IRFLdlVV2CgKNNgJ9/tPz10nW2OxI/8+v8AV2P6z0fTUnkd+Dm6lvSjlGKMxT3TiCbuH8Lr1y4o02fIuZrWGVbXuSSO71mWjVyOrjdGVvwkH9J9y4fgkXH4qufhxKYFVHflWqG91A9jOLq+qeBKlz/tG+LEp8s+OYng1RMLQxbFSuIZlpqpJc2Ddoi39OwvuJ2ugPCadTGVKWJpZsuHqOEqKRZg1MAlT4Md++epWniqIweEw3Uq9LAs1SvVS64cOyAuL7k9W4t5k6AztGmv8xpVbhmfh2JDOosHC1cMVYDu7bEec4J9fOUXFrnhrsbrDFO0eB6PdBusoUMRisSlNKypkAIzszgZEBawzHXQX2noeF9FOGJXbh9YtWxDI9XMcyhKRfKgXKbBrWPM77CwnL4i/wD2PgQvp1mFPqAlj9T7zsYRwektQj/wyD/ShkPNmkrcnw+PYrTBPg4nRD+YilUoYXqaCUq9UVcXUQXbIcuUAixtY35AEC68/W8ZpKvGsBUAGZ6ONVj3hFBX2zt7zl16mAxGDfD1sSlBaOKxTV0LKrPatVJXKSCc2YMCL6jYkTn8b6bYR8ZgsXSzutJcZ1iCmVdesVFUduyk3DbHlM/vyTtLdp3/AEVtFV2OZx2uzdIQXa4p4jCIgOyrambL3XZifWWfxVwFX7b9oFN+qFCiDUyHIG6x1yl9g12XTfWeY43xPr8ZVxdMMmZ0dQSM6lFVQTa4But5v450zxmLofZqvVBCVLZKZDsVYMLlmIHaAPZAnfHBki8c4rhUzFzi7TZ0ug3AcLWSpi8UwKUWsabEKgAUPnqHmu+mg7JvcaTn9M+lpxZ6ih2MMhFuzlNQr8Jt91BYWX1PIDzltCtzZrZhc2axuLjnY66yBTQgdxhPoHkz/WyStLhdkCzJQ0xVeX5Pc9OeGU6PD8E9OmiN/hq5VQCxeiXbMd2JZL6zynCOL4jDPnw1Qpf4l3R/+ZDofPfuInsf4g8cwlfCUaVGoHcPTcBNcoVHU5/l+K1jrc+BngVmHpuJ5cMo5le75L6iWmScX2XBv45xevi6oq4grdVyqqKVRRe5sCSbk7m/ITDaEDPWw4YYYqEFSXY5ZTcnbe4oQhNRChHFABWjhERAAijhJaAUIQgMVoRwiA+68D6b06lE1sSFpKvVqW6y4Ln4ltvZcyXbbteE9Nw/iFKugqUXDqQCCDyIuLjcad8+KYrA0atLC0FV8yI7O4UdWqh064ggWexVho3xPqBzuw3EOIYM5KJABcuzFkWk4J3BbKSSFG2tmN9RYfNPEn+07Vka5PtdeuiWLMBchRc21Owk0YEXGv8Ad/1nxGtxiux/xa2cZr2Cu1wGzLq5XLbReyW0B1N7zRhOleJo0lo0CEVFADN22b+o6AXvc7czGulm0Czb8H2cifnvpdb7fibajrqn1N5sxvGcTW/41eo417Ocqn4Fsv0nnqvxG3eZ6PQYHCbbfY5889SWxXCEJ6xyhPqmP6SomE4ZWLDtVcN1tjcqqUnSpcDXQtPlcLDe05up6ZZtNvg1x5NFn0rGdLcE2NxaViz4erQw1IPTuf8AhiozKLa6msRcadmczF/xAvWStQw1uroYihleoLZKj02RhlB1C0luP6iLm1z4mExj6diXNst9RI2V+L4h6eHpOyhcMB1RVbMCAAGJvqRlEzYjEVKlRqlR2Z2FmYtqRbLbTlbS0rhOqOHHHhGbnJ8siFA0AGm2kcITVJImwijhGIURkoAHlEMiRCTCN3H2iK/3cSHOC5aHTZGKBYd/+lj9QIjUUfMfJP3tJfUYl3RShLwO0UlUYKFNicwvoy3HgwF8p8DYylq5GmQ38SfysJm+swruUsUvBZCZzim+UezfvIti38vJB+omb6/EvJSwyNMYQnYTA2Lfvf0BH5St67HfOfME/nMn6jHsvkpYJHTKHnp56fnIkjmy/iE5RqH5W/DImo/yn2Mzl6k+yRawHVNVPmHsx/SRNZO8nyX9yJy87/KfYyOZ+4/hMyfqE3xQ1gR1PtCf1ew/eE5fb7j+ExTP9fPz8FfRR9EfiNY3AcqCADkOUkDZWZe04H9RMyMed9TFeIzoSS4MhwvIlwJEVAYASNpzq/xnzM6EzVsMSSQRr36fvNsE4xbcmZzi2tjLCWGg9jYLfS3aPrrby/vehw6gkgbG2XXXu1P1m8urxx33/ohYZMnHOc2Lqd3+lf2knxTnRb2F9SSCb20NtP8ArMX6hDsmWunkdAIe4+0RHfYeZA/OckvUO/1vEA/faQ/UfCK/TPydXOvePxA/lGrKdAw57nLt4tYX8JzlWqFLBiAewdtdjb6CbuE8N67slypzPqSToFQ2tf8AqMj9fNukkN4IpW2HWL4+wH6xGuo3ZR5v+lp2uH4FKbMyuhZDluaaPc2Vswzg/Pb/ACzu0eMVgAftKgEWK2RAd91UC/KKXVZnwSowR4ynVW+ouNfhBLbaW5b+E24HhOLrBTTw9Qq1iHGHcpY/ezZDceV52cPjEyLpSXsKCDhqLMOyObIzZvX2mfD4pUREIYkCxANrW0sZm8ueXcpKC7HLrcKxagMaTgEsARYXysVOlwdxzAlTcOr6Z0K32zsRp9fGdzD45ggUvUWzVLBajgZSxI0BsNLe0rbFK2rM7bi7XO3/ADHWRWSXLHceyFwvg7LmU1KQ0RgV6wjtZhbVBY9nnpqNd7ehx3QvEIAFqU3PbzAB+yqaMx7JZhmKr2VPxTlcPxAzXVToV7hsb77Cen43xbEMb08M+Y5w+dc4dGucjCmBazKGBuD6TlyKSZvBpo4ydFjlHWVkR+rxjOjHUNQZ1FrKQU7GpvfXSYF6P17AsyWfqwhDmzF+pIYdnVQK6X218teh9pxihS1BOwK65DTs2TEFg6NTVgwTMxsbDca6iR4jicSgpgU3RMOi0wXXMM3WCpfMBltmRFHgg1N5luanI/lbFQy1Ua6q4sKnwmp1RbVOT8tyBe00HgVQuA7gZjTAZlqXJcuFBUrmX4H1NhoO+U4bHVEKlCBkUILqD2RU6y34p0MHxjKpV0GX/DGVFQKUUuchzAmxLt2r315xUwMY6PVdLkC+4yvcXQ1AAMvbJUHRb2InOxNFVbKpJtoxIsMwJBy3AOXuuAe8Te+NLG7Ih2vemCWsMq5m30HMEHmbnWZ8TUZ3ao5uzEk+Z8BHQWZMsWWXlYZYaRWU5YZZdljywoLKQkYSW5Y8sNIWU2hLcsI6Cyu8g7d05H2w30bu7+XrLqeMX7zczPT1HIbbyl6xBtYWPOc3G4nMwVdZDD1Sj2fQSHMtRO+j3k7zDSxaE2VtfEETVe+xl2TQq9QILmZUxVN7WIBPIkX9pVxmo6gKRa/Ln52nJoVLOrHkdrTKUnqouKTVnbqUBIrhxLqmIXIKgVmU5gcqg5SAps2vZ+IfWZhjQxXLtrcEajax0O28HjGmBo+EQozXaIJJ0BZmI7OXle/ra28swDhGcsoa7KACxFuz4eUsKiQoKl26xygutiEL37Pdce8qEfuROR/a0jqqy/EUFiqt8TALe4tfMPlv6yuvUCdlUS1kOpc7gH5rc5Cu1KyXqEDIMp6knMLtrbPprcW8JPHCmTrUI7NPajfTItj8fMazsUU+DkeqzdSdes6vLTPLTKGBNuW53+hjxL5CxzKNyAMl/iA7V0JHPneDU6YqqRUsc62XqVuToSC2a9iRudpVjKFI1SWqFSe0V6q4sCARmzeQ2nPVreVf9wap77KzQCikXTMCSWtqbNmYkWB20vcbDlLRUpoofqwLkdm+UgG2ma2++tvSZGxVJHJZyO0Pum5GQLuDzAB0HMiYcfxkGwoq5sT2iAAbgiwBB/TaZqE9W7dP3NJOLSpbnpMViqBzPQWrlUKCrDOQ+pJPViwW2XU/tDjXFTQpq+HqswZ8uwIKlNGGYHcIvlbxnjsTxqs1g6puraKQcyiyk5WXXXlaZMRxKq6ZCEADBrgNmuAQNSx0sTM5YJOV3t4LhKo06PQU+klZQMpIsABohNhewJK3IF9Aeeu+sjiekVR1yVCSpN7WUC97k6Lpc6nvOpnlPtNQc/oI/tj87b7Wtf1kvGl2LUmd4cQHyH3kjxAfKfcTijHqDY+4vY+4B9xNCVlbYgxKMWO2dEcQHyn3EX8wHyn3mMSDMY9CFqZu/mI2yn3EDxEfIfcTn3MhVJtBQV0Fs6Q4kPkPvH/Mh8h9xOJRJuRNaxvGk2g1M6B4iPlPvD+ZD5D7iYPaMERaUK2bf5iPkPuITDaENCDUxjhw5On4l/VofytuRB9R+l45BhpoJ3OCObWY3w5SoARrr/e0pqXd7QrhlJbaZKdRg2YE3B3E45PTKqOqKuPJ1sPw584sV1I+939+k9hg8JgsmdK1Wqw2dECIrDnkbUjXnuNbbTzNLGOVBzX89fzjXHsjHIhsVTS4+JRYkW7/AB7hOmKSpu6MJNyVLkr6QMTWJYk6CxNrnXUm05SDMwUbkgDl9TN3EcWKmrU2BAOubT2nNp1ApBtfSYZZLXa4NMaaj7ns8Bg6gopXZKQUgLYf8UFbgs6b5SVJ9RIdUMwtTQDvyCcP+esQBYiwt3yFXi1TTLr5pa31N51w6jHGO7b/AAYzx5JPZJfk72NpKiq4IAYsuXUEWsbnS1jc7H7pmAv2hbuPOUU8XmAzkk7/AA2A8rCSzKTfMBp4/qJKcXJtPZp/JVukmjTn/u8eGUtUsFRtDo5bLy+XW8qAX5x+ID9YClc76WOtx4R4lV/wTKVo6rYYnTqqTEAAgmplXc2UhgSNb89SZXxCn/iU1FNWJW2TM6qbC3xXuALfQTGML5n0lddStm2sHOx0spmkJc34ZNbnVxTqj53pkaghhVNyL3DZL6/l6TJxDi2Y2prZm+Elzc63+EG3rOJiuJPVAzNbuJuWNtiSBppYaW28Zn+1FVKkdrSzA2ttrOT6kWqNljaN6F73qBSbk3LC9/GTq4o88vuB+QnJXFkbjN/zM/5AgR/bB/3afhP6mCzpcA8LfJqqVBfW3v8A7So4gd495UMd3Ig/y/7xjiJ+VfY/vJeZPuUsfsPrwdjIZwf+h/aXPjgVFlObmL6ekrGJHNSPJv0ic0+/wNRfj5EtNT95R55h+YltLCtc5Spt3EE+lhIriOQJ9dxKBXZW137+fvM3zd7fwbRcaprc1DrcwXtC99NF0G9ifWa0xQyg5Tew++P2nIXENmzAm99DfX3ly12y2v3/AHQfzENW2xLW50ftK9x/ED+ggzqQd+yATsDuAPqROeKzf0/+mn/1mhazdWT2d8tsoA5NEpSCkCsLk6667y9XmMHx+ssVo0292S0agwklYTKHkw8uxF94SrP5+0I7FubCsprPl0GpnTpcNqubIhY9y3JtcDl4kD1jbgWJJNqTmxIPYOhBsRtyuJ1ynDycyi/B5msjM4Q+BOuwk6dIAuh8CPK07S9GsWKhc0XPx8iAAuja5TsfyleM4JWpg1KtIoLgXI5nYXI3trOZU3d738G90q7V8nMwxt2TtNjC28oCf3/vJgToimlRhJpuyjHP2SLd0op0u0GG2UTY9MEWa9vDv9xEi2Fu7Qf3eZyg5St8GimlHYa2tt9JIEd0LQyzSjOw0kZK0LR0KyMJK0RhQWRidmKkXNiCDr3yUCInEaZlCDKFuoIvqysQwPkDqNeXdzEyViL6XIFgDa17AC9uW06kiVmEsF8M3WbyjmCovyD/AFfvDrV+Qe7fvOiUHdImivdI+hJcMf1l4MPWL8g/E37xZ1+X/UZsOHXukThFkvDL2GskTNh1uTpewYj0Un9JcjscuY5gTYrck69w2G+lpNMOVOZWsRqJbcjVUQN8wzaHvVScoPppytaT9OSXBWuLObVFiR3EwaqSLGx8ecuOFMPsxEnRPwPVEVHDE6kqPN1B9rzoU6GlgAfUGYhQMkKZmkIuPYiUk+5t+zH5D7RGlYZSDve2u8yBbSxajjZmH+YzX8EV7lvVrDqxIriKg+83qb/nH9pqd4PmiH9IfgK9yXVxFIxim7kP+QD8rQ+1d6L6Zx/8o9vAqfkWSOH2lfk/1mEWwVI9PhOPPSJyD4st72N7G413HoRNX/8AYV7k2GubkBa/K62JHmT372IITZ4YeCFNkKnS2qy5SikZXUXudCCCNT3EjXe+t7CczH8WNVSpFrs7X/qcqT/7QPSEILFBPZCc3RzLQhCaGYRZY4QAVoARwgA7mInwhCABpDL3QhEMRWIiOEAIWiywhAYERQhExihCEQBC0IQARhCETAULQhEMVorRQgxodoWihJGFoiIQgAssIQiGf//Z',

      handler: function (response){
        alert(response.razorpay_payment_id)
        alert('Payment Successfull!!')
      },
      prefill:{
        name:'shop with need'
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open();
    try {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const postResp = await axios.post(ORDERS_URL, item);
        const deleteResp = await axios.delete(CARTS_URL + '/' + item.id)
      }
      
    } catch (error) {
      console.log('error::::::::::::::::::\n', error);
    }
  }
  const deleteCart = async (a) => {
    let isDelete = window.confirm('Are you sure? You wanted to remove this item from carts');
    if (isDelete) {
      {
        data.map(data => {
          if (a === data.Model) {
            axios.delete(`http://localhost:4000/Carts/${data.id}`).then(()=>loadItems());
            window.alert('Removed from Carts')
          }
        })
      }
    }
  }

  const increaseQuantity = async (a,b,c,d,e,f) => {
    if (c === "dec") {
      if (b === 1) {
        b = 1;
      }
      else {
        b -= 1;
      }
    } else {
      if (b === 20) {
        b = 20;
        alert('Quantity should not exceed 20!');
      }
      else {
        b += 1;
      }
    }
    const order = {Model:a,Quantity:b,id:d,Img:e,Price:f}
    axios.put(`http://localhost:4000/Carts/${d}`, order);
    loadItems();
  }
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  const theme = createTheme({
    palette: {
      primary: {
        light: '#FCC8D1',
        main: '#cadfdf',
        dark: '#757ce8',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: 'whiteSmoke',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  })
  return (<>
    <ThemeProvider theme={theme}>
      <Box sx={{ display: { xs: 'in-line block', sm: 'block' } }}>
        <AppBar sx={{ flexGrow: 1 }}>
          <Toolbar>
            <ShoppingCartIcon sx={{ marginRight: '10px', fontSize: '30px',color:'black' }} />
            <Typography variant='h5' sx={{ flexGrow: 1, color: 'black' }}>VIEW CARTS</Typography>
            <Button sx={{ display: { xs: 'inline-block', sm: 'inline-block' } }} class='login-button' onClick={()=>navigate('/Dashboard')}>BACK</Button>
            <Button sx={{ display: { xs: 'none', sm: 'inline-block' } }} class='login-button' onClick={() => logoutDashboard()}>LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
    <Box class='profile-button'>
    {isLoading ?
      <div>
        <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>

          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
          <CartSkeleton />
          <br></br>
        </Box>
      </div>
      :data.map(data => {
        return (
          <Paper sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#cadfdf',
            marginTop: '70px', 
              boxShadow: 10
          }}>
            <Grid container spacing={2} >
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={data.Img} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                      Standard license
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {data.Model}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'left', marginTop: '10px' }}>
                      Qty<button style={{ marginLeft: '10px', backgroundColor: '#002884', color: 'white',':hover':{boxShadow:10} }} onClick={() => increaseQuantity(data.Model,data.Quantity,"dec",data.id,data.Img,data.Price)}>-</button>
                      <input type="text" value={data.Quantity} style={{ width: '25px' }} />
                      <button style={{ marginRight: '10px', backgroundColor: '#002884', color: 'white' ,':hover':{boxShadow:10}}} onClick={() => increaseQuantity(data.Model,data.Quantity,"inc",data.id,data.Img,data.Price)}>+</button>
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: 'right' }} >
                      <CurrencyRupeeIcon sx={{ fontSize: '15px' }} />{data.Price * data.Quantity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button class='remove-button' onClick={() => deleteCart(data.Model)}>
                     <DeleteIcon sx={{fontSize:'15px',marginRight:'2px'}}/>REMOVE
                    </Button>
                    <Button class='addcart-button'>
                      <ShoppingBagIcon sx={{fontSize:'15px',marginRight:'2px'}}/>BUY NOW
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </Paper>
            )
  })}
    
    {isLoading?
     <div>
     <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>
      <CartSkeleton/>
      </Box>
      </div>
    :<Paper sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1, marginTop: '20px', 
        boxShadow: 10, // theme.shadows[20]
      
    }}>
      <Grid container>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant='h6' sx={{ textAlign: 'left' }}>TOTAL PRICE</Typography></Grid>
        <Grid item><Typography variant='h6'><CurrencyRupeeIcon sx={{width:'15px',height:'15px'}}  />{total}</Typography></Grid>
        </Grid>
        </Paper>}
    {isLoading ?
      <div>
        <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>
          <CartSkeleton />
        </Box>
      </div>
        : <Box sx={{ marginTop: '20px', marginLeft: '580px', display: { xs: 'none', sm: 'block' } }}><Button class='place-order'  onClick={() => sendOrder(total)}>PLACE ORDER</Button></Box>}
      {isLoading ?
        <div>
          <Box sx={{ marginTop: '70px', marginLeft: '400px' }}>
            <CartSkeleton />
          </Box>
        </div>
        : <Box sx={{ marginTop: '20px', marginLeft: '140px', display: { xs: 'block', sm: 'none' } }}><Button class='place-order'  onClick={() => sendOrder(total)}>PLACE ORDER</Button></Box>}
    </Box>
  </>)
}
export default ViewCart;