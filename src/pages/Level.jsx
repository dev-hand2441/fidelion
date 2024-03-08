import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Level() {
    return (
        <div className="gn-level">
            {/* <div className="gn-block">
                <h4 className="text-strapline">레벨업 계산</h4>
            </div> */}
            <div className="gn-block">
                <h4 className="text-strapline">레벨 구간 별 필요 코인량</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Mercenary</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>
                                1
                                <i>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </i>
                                10
                            </td>
                            <td>2</td>
                            <td>7,006</td>
                        </tr>
                        <tr>
                            <td>
                                10
                                <i>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </i>
                                20
                            </td>
                            <td>3</td>
                            <td>8,770</td>
                        </tr>
                        <tr>
                            <td>
                                20
                                <i>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </i>
                                30
                            </td>
                            <td>4</td>
                            <td>11,970</td>
                        </tr>
                        <tr>
                            <td>
                                30
                                <i>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </i>
                                40
                            </td>
                            <td>5</td>
                            <td>23,410</td>
                        </tr>
                        <tr>
                            <td>
                                40
                                <i>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </i>
                                50
                            </td>
                            <td>5</td>
                            <td>47,020</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Level
