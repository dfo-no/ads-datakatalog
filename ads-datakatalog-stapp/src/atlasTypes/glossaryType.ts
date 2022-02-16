export interface IGlossary {
    guid: string;
    qualifiedName: string;
    name: string;
    terms: ITerm[];
    termInfo: { [key: string]: ITermInfo };
}

export interface ITermInfo {
    guid: string;
    qualifiedName: string;
    name: string;
    longDescription: string;
    lastModifiedTS: string;
    createdBy: string;
    updatedBy: string;
    createTime: number;
    updateTime: number;
    status: string;
    anchor: IAnchor;
    seeAlso?: ITerm[];
    assignedEntities?: IAssignedEntity[];
    resources?: IResource[];
    attributes?: ITermInfoAttributes;
}

export interface IAnchor {
    glossaryGuid: string;
    relationGuid: string;
}

export interface IAssignedEntity {
    guid: string;
    typeName: ITypeName;
    entityStatus: string;
    displayText: string;
    relationshipType: IRelationshipType;
    relationshipGuid: string;
    relationshipStatus: string;
    relationshipAttributes: IRelationshipAttributes;
}

export enum IStatus {
    Active = 'ACTIVE'
}

export interface IRelationshipAttributes {
    typeName: IRelationshipType;
    attributes: IRelationshipAttributesAttributes;
}

export interface IRelationshipAttributesAttributes {
    expression: null;
    createdBy: null;
    steward: null;
    confidence: null;
    description: null;
    source: null;
    status: null;
}

export enum IRelationshipType {
    AtlasGlossarySemanticAssignment = 'AtlasGlossarySemanticAssignment'
}

export enum ITypeName {
    AzureDatalakeGen2Filesystem = 'azure_datalake_gen2_filesystem',
    AzureDatalakeGen2Path = 'azure_datalake_gen2_path',
    AzureSQLTable = 'azure_sql_table'
}

export interface ITermInfoAttributes {
    Datasett?: IDatasett;
    Distribusjon?: IDistribusjon;
    Informasjonsmodell?: IInformasjonsmodell;
}

export interface ITemplate {
    Tittel: string | null;
}

export interface IDatasett extends ITemplate {
    TidsmessigAvgrensetTil: number;
    Tema: string | null;
    Utgiver: string | null;
    Dokumentasjon: string | null;
    DataeierEpost: string | null;
    Emneord: string | null;
    TidsmessigAvgrensetFra: number;
    GeografiskAvgrensing: string | null;
    Type: string | null;
    Tilgangsnivå: string | null;
    Oppdateringsfrekvens: string | null;
    Dataeier: string | null;
}

export interface IDistribusjon extends ITemplate {
    Utgiver: string | null;
    TilgangsUrl: string | null;
    Format: string | null;
    Nedlastningslenke: string | null;
}

export interface IInformasjonsmodell extends ITemplate {
    Utgiver: string | null;
}

export interface IResource {
    displayName: string;
    url: string;
}

export interface ITerm {
    termGuid: string;
    relationGuid: string;
    displayText: string;
}
