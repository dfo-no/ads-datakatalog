import React from 'react';
import { Link } from 'react-router-dom';
import { EntityType } from '../../../Components/EntityType/EntityType';
import SearchResult from '../../../datakatalog/search/searchResult';
import { stripHtml } from '../../../stringUtils';
import Style from './GlossaryResults.module.css';

interface GlossaryResultsProps {
    resultater: SearchResult[];
}

export const GlossaryResults = ({ resultater }: GlossaryResultsProps) => (
    <div>
        {resultater.map(
            (sr) =>
                sr.type && (
                    <div className={Style['GlossaryResults-result']} key={sr.id}>
                        <div className={Style['GlossaryResults-result-header']}>
                            <div>
                                <Link
                                    className={Style['GlossaryResults-link']}
                                    to={`/${sr.typeOfResult}/${sr.id}/${sr.title}`}
                                >
                                    {sr.title}
                                </Link>
                            </div>
                            <div>
                                <p>
                                    <EntityType type={sr.type[0]?.description} />
                                </p>
                            </div>
                        </div>
                        <p>{stripHtml(sr.description)}</p>
                    </div>
                )
        )}
    </div>
);
