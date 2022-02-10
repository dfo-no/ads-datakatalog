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
    Datakatalog: IDatakatalog;
}

export interface IDatakatalog {
    Utgiver: string | null;
    Tema: string | null;
    Tilgangsnivå: string | null;
    Dokumentasjon: string | null;
    Identifikator: string | null;
    Oppdateringsfrekvens: string | null;
    Dataeier: string | null;
    Type: string | null;
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
