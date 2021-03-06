"""membuat tabel produk

Revision ID: 0b6f52c8d028
Revises: 2239da6766ae
Create Date: 2021-12-04 16:17:26.166337

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b6f52c8d028'
down_revision = '2239da6766ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('produk',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('nama', sa.String(length=250), nullable=False),
    sa.Column('harga', sa.Integer(), nullable=False),
    sa.Column('keterangan', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('nama')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('produk')
    # ### end Alembic commands ###
